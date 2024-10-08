import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Lock extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stroke: PropTypes.string,
    fill: PropTypes.string,
    svgProps: PropTypes.object
  };

  static defaultProps = {
    className: "",
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
    const { className } = this.props;
    return classnames("manicon-svg", className);
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
      viewBox: this.viewBox
    };

    const svgProps = Object.assign(baseSvgProps, this.props.svgProps);

    return (
      <svg {...svgProps}>
        <g fill="none" fillRule="evenodd">
          <path
            fill={this.fill}
            fillRule="nonzero"
            d="M2.98990292,7.47282624 L12.9899029,7.47282624 L13.0100971,15.0271738 L3.01009708,15.0271738 L2.98990292,7.47282624 Z M6.00228021,6.50729808 L5.00229284,6.51232269 C4.99923925,5.90460349 4.99771347,5.0752385 4.99771347,4.02403374 C4.99771347,2.19534242 6.20259598,1.00981038 8.00228653,1.00981038 C9.7784289,1.00981038 11.0022865,2.23366801 11.0022865,4.00981038 C11.0022865,5.42647705 11.0022865,5.42647705 11.0022865,6.50981038 L10.0022865,6.50981038 C10.0022865,5.42647705 10.0022865,5.42647705 10.0022865,4.00981038 C10.0022865,2.78595276 9.22614415,2.00981038 8.00228653,2.00981038 C6.75128917,2.00981038 5.99771347,2.75128362 5.99771347,4.02403374 C5.99771347,5.07370586 5.9992364,5.9015253 6.00228021,6.50729808 Z"
          />
        </g>
      </svg>
    );
  }
}
