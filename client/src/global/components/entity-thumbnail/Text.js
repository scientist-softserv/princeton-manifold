import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Utility from "global/components/utility";

export default class EntityThumbnailText extends PureComponent {
  static displayName = "EntityThumbnail.Text";

  static propTypes = {
    entity: PropTypes.object.isRequired,
    variant: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    variant: "smallPortrait",
    attributes: {}
  };

  get attr() {
    return this.props.entity.attributes;
  }

  get variant() {
    return this.props.variant;
  }

  get src() {
    return this.attr.coverStyles[this.variant];
  }

  get icon() {
    const { width, height, className } = this.props;
    return (
      <Utility.IconComposer
        svgProps={{ width, height, className }}
        icon="textsLoosePages64"
      />
    );
  }

  get useImage() {
    return !!this.src;
  }

  get image() {
    const { width, height, className } = this.props;
    return (
      <img
        alt=""
        src={this.src}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  render() {
    if (!this.useImage) return this.icon;
    return this.image;
  }
}
