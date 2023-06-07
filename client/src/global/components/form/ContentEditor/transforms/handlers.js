import { getCommonBlock } from "./utils";
import { isValidUrl } from "../utils/helpers";
import {
  wrapLink,
  unwrapLink,
  isLinkActive
} from "../components/controls/buttons/LinkButton";
import { Transforms, Range, Node } from "slate";

export const handleLinkHotkey = editor => {
  if (isLinkActive(editor)) return unwrapLink(editor);

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  // If the selection is a range of text, check to see if that range is a url; if so, turn it into a link.
  if (!isCollapsed) {
    const [block] = getCommonBlock(editor);
    const textContent = Node.string(block);
    if (isValidUrl(textContent)) return wrapLink(editor, textContent);
  }

  // Otherwise, open the link insert modal
  const button = document.getElementsByName("link-modal-trigger");
  if (button[0]) button[0].click();
};

export const handleImageHotkey = () => {
  const button = document.getElementsByName("img-modal-trigger");
  if (button[0]) button[0].click();
};

export const handleIframeHotkey = () => {
  const button = document.getElementsByName("iframe-modal-trigger");
  if (button[0]) button[0].click();
};

export const insertSoftBreak = editor => {
  Transforms.insertText(editor, "\n");
};
