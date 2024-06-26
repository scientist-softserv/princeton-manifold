import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class EyeClosed extends Component {
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
        <path
          fillRule="evenodd"
          d="M16.0033,12.5479 C14.3493,12.5479 13.0033,13.8939 13.0033,15.5479 C13.0033,15.8149 13.0493,16.0679 13.1143,16.3139 L12.3203,17.1079 C12.1163,16.6279 12.0033,16.1009 12.0033,15.5479 C12.0033,13.3419 13.7973,11.5479 16.0033,11.5479 C16.5563,11.5479 17.0833,11.6609 17.5633,11.8649 L16.7693,12.6589 C16.5233,12.5939 16.2693,12.5479 16.0033,12.5479 Z M16.0033,18.5479 C17.6573,18.5479 19.0033,17.2019 19.0033,15.5479 C19.0033,15.2799 18.9573,15.0269 18.8913,14.7789 L19.6853,13.9859 C19.8893,14.4659 20.0033,14.9929 20.0033,15.5479 C20.0033,17.7539 18.2093,19.5479 16.0033,19.5479 C15.4493,19.5479 14.9213,19.4339 14.4413,19.2299 L15.2343,18.4359 C15.4813,18.5009 15.7353,18.5479 16.0033,18.5479 Z M9.663,19.7647 L8.938,20.4907 C6.137,18.4857 4.332,16.0097 4.208,15.8367 L4,15.5457 L4.208,15.2547 C4.418,14.9607 9.438,8.0377 16.003,8.0377 C17.568,8.0377 19.041,8.4387 20.387,9.0407 L19.62,9.8087 C18.487,9.3397 17.272,9.0377 16.003,9.0377 C10.676,9.0377 6.261,14.2457 5.243,15.5457 C5.809,16.2677 7.427,18.1937 9.663,19.7647 Z M27.7987,15.2549 L28.0067,15.5459 L27.7987,15.8369 C27.5887,16.1309 22.5687,23.0539 16.0037,23.0539 C14.4387,23.0539 12.9657,22.6529 11.6197,22.0499 L12.3867,21.2829 C13.5197,21.7519 14.7347,22.0539 16.0037,22.0539 C21.3307,22.0539 25.7457,16.8459 26.7637,15.5459 C26.1977,14.8239 24.5797,12.8989 22.3437,11.3269 L23.0687,10.6019 C25.8687,12.6069 27.6747,15.0809 27.7987,15.2549 Z M24.8422,6 L25.5492,6.707 L7.1642,25.092 L6.4572,24.385 L24.8422,6 Z"
        />
      </svg>
    );
  }
}
