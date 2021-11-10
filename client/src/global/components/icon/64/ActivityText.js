import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class ActivityText extends Component {
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
    return 64;
  }

  get defaultWidth() {
    return 64;
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
    return "0 0 64 64";
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
          d="M63,32 C63,49.121 49.12,63 32,63 C14.879,63 1,49.121 1,32 C1,14.879 14.879,1 32,1 C49.12,1 63,14.879 63,32 M22.5634,39.0022 L34.5634,39.0022 L34.5634,37.0022 L22.5634,37.0022 L22.5634,39.0022 Z M22.5634,35.0022 L37.5634,35.0022 L37.5634,33.0022 L22.5634,33.0022 L22.5634,35.0022 Z M22.5634,31.0022 L34.5634,31.0022 L34.5634,29.0022 L22.5634,29.0022 L22.5634,31.0022 Z M22.5634,27.0022 L37.5634,27.0022 L37.5634,25.0022 L22.5634,25.0022 L22.5634,27.0022 Z M42.5635,51.002 C39.2545,51.002 36.5635,48.311 36.5635,45.002 C36.5635,41.693 39.2545,39.002 42.5635,39.002 C45.8725,39.002 48.5635,41.693 48.5635,45.002 C48.5635,48.311 45.8725,51.002 42.5635,51.002 L42.5635,51.002 Z M19.5635,47.002 L19.5635,14.002 L35.4245,14.002 C35.4665,14.002 35.5115,14.06 35.5385,14.14 L35.4065,14.261 L35.5635,14.432 L35.5635,22.002 L42.4245,22.002 C42.4815,22.002 42.5635,22.088 42.5635,22.224 L42.5635,37.002 C38.1525,37.002 34.5635,40.591 34.5635,45.002 C34.5635,45.693 34.6615,46.361 34.8275,47.002 L19.5635,47.002 Z M37.5635,16.61 L40.6775,20.002 L37.5635,20.002 L37.5635,16.61 Z M44.5635,37.266 L44.5635,22.224 C44.5635,21.637 44.3385,21.106 43.9795,20.707 L44.0125,20.677 L37.4445,13.523 C37.1595,12.643 36.3675,12.002 35.4245,12.002 L17.5635,12.002 L17.5635,49.002 L35.5635,49.002 L35.5635,48.866 C36.9285,51.329 39.5535,53.002 42.5635,53.002 C46.9745,53.002 50.5635,49.413 50.5635,45.002 C50.5635,41.282 48.0075,38.157 44.5635,37.266 L44.5635,37.266 Z M43.5635,41.002 L41.5635,41.002 L41.5635,44.002 L38.5635,44.002 L38.5635,46.002 L41.5635,46.002 L41.5635,49.002 L43.5635,49.002 L43.5635,46.002 L46.5635,46.002 L46.5635,44.002 L43.5635,44.002 L43.5635,41.002 Z"
        />
      </svg>
    );
  }
}
