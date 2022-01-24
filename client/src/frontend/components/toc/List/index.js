import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Node from "../Node";
import * as Styled from "./styles";

export default class ContentBlockTocBlockList extends PureComponent {
  static displayName = "ContentBlock.Types.TOC.List";

  static propTypes = {
    showTextTitle: PropTypes.bool,
    showAuthors: PropTypes.bool,
    text: PropTypes.object.isRequired,
    depth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.keyCount = 0;
  }

  get text() {
    return this.props.text;
  }

  get textTitle() {
    return this.text.attributes.titleFormatted;
  }

  get textSubtitle() {
    return this.text.attributes.subtitle;
  }

  get toc() {
    return this.text.attributes.toc;
  }

  showChildren = (node, depth) => {
    return (
      depth < this.props.depth && node.children && node.children.length > 0
    );
  };

  renderNode = (node, depth = 1) => {
    let children = null;

    if (this.showChildren(node, depth)) {
      depth++; // eslint-disable-line no-param-reassign

      children = (
        <Styled.List $depth={depth}>
          {/* eslint-disable-next-line no-shadow */}
          {node.children.map(node => this.renderNode(node, depth))}
        </Styled.List>
      );
    }

    const anchor = node.anchor ? `#${node.anchor}` : "";

    return (
      <li key={this.keyCount++}>
        <Node
          id={node.id}
          anchor={anchor}
          title={node.label}
          className={this.props.blockClass}
          textSlug={this.text.attributes.slug}
        >
          {children}
        </Node>
      </li>
    );
  };

  renderEmpty() {
    return (
      <Styled.List>This text does not have a table of contents.</Styled.List>
    );
  }

  renderContents() {
    if (this.toc.length <= 0) return this.renderEmpty();

    return (
      <Styled.List $depth={1}>
        {this.toc.map(node => this.renderNode(node, 1))}
      </Styled.List>
    );
  }

  renderTextHeading() {
    return (
      <Styled.Heading>
        <Styled.TextTitle
          dangerouslySetInnerHTML={{
            __html: this.textTitle
          }}
        />
        {this.textSubtitle && (
          <Styled.TextSubtitle>{this.textSubtitle}</Styled.TextSubtitle>
        )}
      </Styled.Heading>
    );
  }

  render() {
    return (
      <Styled.Block>
        {this.props.showTextTitle && this.renderTextHeading()}
        {this.renderContents()}
      </Styled.Block>
    );
  }
}