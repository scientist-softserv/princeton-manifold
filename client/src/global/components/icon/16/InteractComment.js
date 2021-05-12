import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class InteractComment extends Component {
  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stroke: PropTypes.string,
    fill: PropTypes.string,
    svgProps: PropTypes.object
  };

  static defaultProps = {
    iconClass: "",
    size: "inherit",
    stroke: "currentColor",
    fill: "currentColor",
    svgProps: {}
  };

  get defaultHeight() {
    return 16;
  }

  get defaultWidth() {
    return 16;
  }

  get size() {
    return this.props.size;
  }

  get width() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultWidth;
    return this.size;
  }

  get height() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultHeight;
    return this.size;
  }

  get viewBox() {
    return "0 0 16 16";
  }

  get classes() {
    const { iconClass } = this.props;
    return classnames("manicon-svg", iconClass);
  }

  get fill() {
    return this.props.fill;
  }

  get stroke() {
    return this.props.stroke;
  }

  render() {
    const baseSvgProps = {
      xmlns: "http://www.w3.org/2000/svg",
      className: this.classes,
      width: this.width,
      height: this.height,
      viewBox: this.viewBox,
      fill: this.fill
    };

    const svgProps = Object.assign(baseSvgProps, this.props.svgProps);

    return (
      <svg {...svgProps}>
        <path
          d="M11.7,2.5c1,0,1.8,0.8,1.8,1.8l0,0v4.3c0,1-0.8,1.8-1.8,1.8l0,0H9l-4,3v-3H4.4
	c-1,0-1.8-0.8-1.8-1.8l0,0V4.3c0-1,0.8-1.8,1.8-1.8l0,0H11.7z M11.7,3.5H4.4c-0.5,0-0.8,0.4-0.8,0.8l0,0v4.3c0,0.5,0.4,0.8,0.8,0.8
	l0,0H6v2l2.7-2h3c0.5,0,0.8-0.4,0.8-0.8l0,0V4.3C12.5,3.9,12.1,3.5,11.7,3.5L11.7,3.5z M11,7v1H5V7H11z M11,5v1H5V5H11z"
        />
      </svg>
    );
  }
}
