import React from "react";
import * as ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import {
  getAnnotationStyles,
  getlocalAnnotationsArray
} from "./annotationHelpers";
import { useTranslation } from "react-i18next";
import { uid } from "react-uid";

const createNode = n =>
  React.createElement(
    n.tag,
    {
      ...n.attributes,
      key: n.nodeUuid ?? uid(n),
      "data-node-uuid": n.nodeUuid,
      "data-text-digest": n.textDigest
    },
    n.content ? n.content : n.children?.map(child => createNode(child))
  );

function MathNode({
  attributes,
  children,
  openAnnotations,
  uuids,
  hasInteractiveAncestor
}) {
  const { t } = useTranslation();

  const childNodes = children.map(child => createNode(child));

  const localAnnotations = getlocalAnnotationsArray(openAnnotations);
  const {
    classes,
    removableHighlightId,
    textAnnotationIds,
    annotationIds,
    interactiveAttributes
  } = getAnnotationStyles(localAnnotations, uuids, t, hasInteractiveAncestor);

  const Wrapper = attributes.display === "inline" ? "span" : "div";
  const wrapperStyles = Wrapper === "div" ? { width: "max-content" } : {};

  return (
    <Wrapper
      data-mathml="true"
      className={classes}
      style={wrapperStyles}
      data-removable-highlight-id={removableHighlightId}
      data-text-annotation-ids={textAnnotationIds}
      data-annotation-ids={annotationIds}
      {...interactiveAttributes}
    >
      <math {...attributes}>{childNodes}</math>
    </Wrapper>
  );
}

MathNode.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.array
};

export default MathNode;
