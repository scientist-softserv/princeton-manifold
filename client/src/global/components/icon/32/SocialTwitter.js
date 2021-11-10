import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class SocialTwitter extends Component {
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
    return 32;
  }

  get defaultWidth() {
    return 32;
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
    return "0 0 32 32";
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
      viewBox: this.viewBox,
      fill: this.fill
    };

    const svgProps = Object.assign(baseSvgProps, this.props.svgProps);

    return (
      <svg {...svgProps}>
        <path d="M30,7.31619997 C28.9515228,7.78072545 27.8393881,8.0856069 26.7006,8.22069998 C27.9003003,7.50286885 28.798046,6.37328518 29.2265,5.04249997 C28.0989009,5.71176382 26.8651508,6.18326004 25.5786,6.43659997 C23.7976636,4.54435699 20.9689701,4.0817104 18.6779871,5.30797114 C16.3870042,6.53423188 15.2031629,9.14460899 15.79,11.676 C11.1708147,11.4447105 6.86706167,9.26302756 3.94999996,5.67399997 C2.42561389,8.29903306 3.20400896,11.6568278 5.72789997,13.3434 C4.81566995,13.3148893 3.92350112,13.0685314 3.12589996,12.6249 L3.12539996,12.6971 C3.12573033,15.4316379 5.05254245,17.7873646 7.73269997,18.33 C6.8867092,18.5599269 5.99937697,18.5935827 5.13839997,18.4284 C5.8907162,20.7684358 8.04713954,22.3715983 10.5047,22.4179 C8.46977147,24.0149399 5.95678428,24.8810499 3.36999996,24.8769 C2.91216116,24.877069 2.45470735,24.8503564 1.99999996,24.7969 C4.62662885,26.4847185 7.68363698,27.3806651 10.8058,27.3777 C21.3722,27.3777 27.1502,18.6244 27.1502,11.0332 C27.1502,10.7842 27.1446667,10.5365 27.1336,10.2901 C28.2582178,9.47703381 29.2288714,8.46997741 30,7.31619997 L30,7.31619997 Z" />
      </svg>
    );
  }
}
