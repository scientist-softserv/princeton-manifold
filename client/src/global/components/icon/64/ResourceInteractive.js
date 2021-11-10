import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class ResourceInteractive extends Component {
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
        <path d="M21.4956013,19.2690662 C21.5289184,16.9286034 23.327245,14.9926588 25.6097289,14.7927249 C26.8650473,14.6191466 28.1355895,14.9803771 29.1118232,15.7884126 C30.088057,16.596448 30.6803554,17.7771036 30.7457,19.0933 L30.7457,35.0806 C30.7457,35.6328848 30.2979847,36.0806 29.7457,36.0806 C29.1934152,36.0806 28.7457,35.6328848 28.7457,35.0806 L28.7469787,19.1438546 C28.711253,18.4380826 28.380964,17.7797024 27.8365774,17.3291098 C27.2921909,16.8785173 26.5836863,16.6770809 25.8344932,16.7794387 C24.5244819,16.8948946 23.5141174,17.9825778 23.4955,19.2833 L23.4955,45.1124 C23.4955,46.2401409 21.9195943,46.5052863 21.5505572,45.4396357 C21.5304197,45.3814856 21.4878363,45.2641818 21.4236846,45.0962993 C21.3150148,44.8119151 21.1864714,44.4938691 21.0389872,44.15079 C20.6178667,43.1711752 20.1315442,42.1921649 19.5893735,41.2840778 C17.6524854,38.0399649 15.6848297,36.7137585 13.7540961,37.8415724 C13.5611275,37.9542947 13.4677489,38.235283 13.5142395,38.7647825 C13.5441407,39.10534 13.6335912,39.4900528 13.7647511,39.8847301 C13.8669507,40.1922623 13.9681215,40.4337237 14.0280313,40.5580684 C15.3209012,43.2264397 16.0575076,46.1299023 16.1915853,49.0667273 C16.330008,51.0149325 17.3040141,53.0701589 18.8552105,55.0882084 C19.4577367,55.8720727 20.1051448,56.5943638 20.7519245,57.2360563 C20.9774817,57.4598394 21.186206,57.6570049 21.3724048,57.8253096 C21.4812885,57.9237293 21.556437,57.9890036 21.5921668,58.0189351 C22.0155289,58.373594 22.0712238,59.0043047 21.7165649,59.4276668 C21.361906,59.851029 20.7311953,59.9067239 20.3078332,59.552065 C20.1068545,59.3837011 19.7704359,59.0796132 19.3433057,58.6558426 C18.6365081,57.9546044 17.9303389,57.1667554 17.2695262,56.3070624 C15.5008064,54.006023 14.3675912,51.6148536 14.1951454,49.1833144 C14.0719977,46.4922797 13.4027727,43.8544126 12.2272195,41.4281673 C12.1319185,41.2303758 11.9988495,40.9127838 11.8668093,40.5154574 C11.6903456,39.9844549 11.5670901,39.4543519 11.5219042,38.9397115 C11.4148675,37.7206285 11.756655,36.6921454 12.745311,36.1146235 C15.9720198,34.2297819 18.8752805,36.186589 21.3065925,40.2588173 C21.3703498,40.3656051 21.4333264,40.4731444 21.4955177,40.5813535 L21.4956013,19.2690662 Z M45.2462,40.7778 C45.2462,41.3300848 44.7984848,41.7778 44.2462,41.7778 C43.6939153,41.7778 43.2462,41.3300848 43.2462,40.7778 L43.2471939,37.4539263 C43.35734,34.9852815 45.4431957,33.0706051 47.8303738,33.1717378 C50.2994043,33.0706051 52.3852601,34.9852815 52.4964,37.4985 L52.4964,58.7855 C52.4964,59.3377848 52.0486848,59.7855 51.4964,59.7855 C50.9441153,59.7855 50.4964,59.3377848 50.4964,58.7855 L50.4973939,37.5430737 C50.4363555,36.175053 49.2804607,35.1140186 47.8303738,35.1700622 C46.4621394,35.1140186 45.3062445,36.175053 45.2462,37.4985 L45.2462,40.7778 Z M37.996,37.9466 C37.996,38.4988848 37.5482848,38.9466 36.996,38.9466 C36.4437153,38.9466 35.996,38.4988848 35.996,37.9466 L35.9969939,34.9767263 C36.10714,32.5080815 38.1929957,30.5934051 40.5801738,30.6945378 C43.0492043,30.5934051 45.13506,32.5080815 45.2462,35.0213 L45.2462,42.5147 C45.2462,43.0669848 44.7984848,43.5147 44.2462,43.5147 C43.6939153,43.5147 43.2462,43.0669848 43.2462,42.5147 L43.2471939,35.0658737 C43.1861555,33.697853 42.0302607,32.6368186 40.5801738,32.6928622 C39.2119394,32.6368186 38.0560445,33.697853 37.996,35.0213 L37.996,37.9466 Z M30.7458,39.7668 C30.7458,40.3190848 30.2980847,40.7668 29.7458,40.7668 C29.1935152,40.7668 28.7458,40.3190848 28.7458,39.7668 L28.7467939,32.1930263 C28.85694,29.7243815 30.9427957,27.8097051 33.3299738,27.9108378 C35.7990043,27.8097051 37.88486,29.7243815 37.996,32.2376 L37.996,39.7668 C37.996,40.3190848 37.5482848,40.7668 36.996,40.7668 C36.4437153,40.7668 35.996,40.3190848 35.996,39.7668 L35.9969939,32.2821737 C35.9359555,30.914153 34.7800607,29.8531186 33.3299738,29.9091622 C31.9617393,29.8531186 30.8058445,30.914153 30.7458,32.2376 L30.7458,39.7668 Z M24.8472,4.21449996 L26.8472,4.21449996 L26.8472,9.87849997 L24.8472,9.87849997 L24.8472,4.21449996 Z M35.2177683,7.38035292 L36.6898317,8.734247 L33.0063317,12.739247 L31.5342683,11.3853529 L35.2177683,7.38035292 Z M40.1401,16.3344 L40.1401,18.3344 L34.9309,18.3344 L34.9309,16.3344 L40.1401,16.3344 Z M16.7635,16.3344 L16.7635,18.3344 L11.5543,18.3344 L11.5543,16.3344 L16.7635,16.3344 Z M20.1600409,11.3853629 L18.6879591,12.7392371 L15.0045591,8.73423704 L16.4766409,7.38036288 L20.1600409,11.3853629 Z" />
      </svg>
    );
  }
}
