import { Editor as SlateEditor, Transforms, Node } from "slate";
import {
  findListChild,
  nestListItem,
  liftListItem,
  getListNode,
  getListItemNode,
  setSelectionAtPoint,
  getIndentSelectionLocation,
  handleInlineItemChildren
} from "./utils";

export const increaseIndent = editor => {
  const [node, path] = getListItemNode(editor, editor.selection);
  const [listNode, listNodePath] = getListNode(editor, path);

  if (!node || !listNode) return;

  const listType = listNode.type;
  const index = [...path].pop();

  if (index === 0)
    return SlateEditor.withoutNormalizing(editor, () => {
      nestListItem({
        editor,
        srcPath: listNodePath,
        destPath: listNodePath,
        node: listNode,
        type: listType
      });
      const { path: selectionPath, offset } = getIndentSelectionLocation(
        editor,
        [...listNodePath, 0, 0]
      );
      setSelectionAtPoint(editor, selectionPath, offset);
    });

  const prevItemPath = [...path.slice(0, -1), index - 1];
  const [prevItem] = SlateEditor.node(editor, prevItemPath);

  if (!prevItem) return;

  const iterator = Node.children(editor, prevItemPath);
  const [subListNode, subListPath] = findListChild(iterator);

  if (subListNode) {
    return Transforms.moveNodes(editor, {
      at: path,
      to: [...subListPath, subListNode.children.length]
    });
  }

  SlateEditor.withoutNormalizing(editor, () => {
    if (SlateEditor.hasBlocks(editor, prevItem)) {
      const destPath = [...prevItemPath, prevItem.children.length];
      nestListItem({
        editor,
        srcPath: path,
        destPath,
        node,
        type: listType
      });
      const { path: selectionPath, offset } = getIndentSelectionLocation(
        editor,
        [...destPath, 0]
      );
      setSelectionAtPoint(editor, selectionPath, offset);
      return;
    }

    handleInlineItemChildren({
      editor,
      at: [...prevItemPath, 0],
      nodes: prevItem.children
    });
    const destPath = [...prevItemPath, 1];
    nestListItem({
      editor,
      srcPath: path,
      destPath,
      node,
      type: listType
    });
    const { path: selectionPath, offset } = getIndentSelectionLocation(editor, [
      ...destPath,
      0
    ]);
    setSelectionAtPoint(editor, selectionPath, offset);
  });
};

export const decreaseIndent = editor => {
  const [node, path] = getListItemNode(editor, editor.selection);
  const [parentLi, parentPath] = getListItemNode(editor, path);
  const [listNode, listNodePath] = getListNode(editor, path);
  const listParent = Node.parent(editor, listNodePath);
  const isWrappedList = listParent?.type === "ul" || listParent?.type === "ol";

  if (!node || !((listNode && isWrappedList) || parentLi)) return;

  const index = [...path].pop();

  if (index === 0)
    return SlateEditor.withoutNormalizing(editor, () => {
      if (isWrappedList) {
        return liftListItem({ editor, srcPath: listNodePath });
      }
      const destIndex = [...parentPath].pop() + 1;
      const destPath = [...parentPath.slice(0, -1), destIndex];
      liftListItem({ editor, srcPath: listNodePath, destPath });
      handleInlineItemChildren({ editor, at: [...destPath.slice(0, -1), 0] });
    });

  if (!parentLi) return;

  SlateEditor.withoutNormalizing(editor, () => {
    const destIndex = [...parentPath].pop() + 1;
    const destPath = [...parentPath.slice(0, -1), destIndex];
    liftListItem({ editor, srcPath: path, destPath, unwrap: false });
  });
};
