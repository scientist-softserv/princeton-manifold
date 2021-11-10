import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class New extends Component {
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
        <path d="M32,56.5333 C45.5493675,56.5333 56.5333,45.5493675 56.5333,32 C56.5333,18.4506325 45.5493675,7.46669996 32,7.46669996 C18.4506325,7.46669996 7.46669996,18.4506325 7.46669996,32 C7.46669996,45.5493675 18.4506325,56.5333 32,56.5333 Z M15.7194,37.84 C15.6222,38.1545 15.4147,38.134 15.1066,37.9758 C14.7153363,37.7613295 14.3690317,37.4735232 14.0866,37.1281 C13.8956815,36.8986676 13.8152363,36.5969253 13.8666,36.3029 C14.8524071,32.6631579 16.1163589,29.1045221 17.6473,25.6584 C17.8661,25.1884 18.2215,25.2484 18.6058,25.3674 C19.2500377,25.6019059 19.8634247,25.9137538 20.4325,26.2961 C20.9066,26.6106 20.8817,26.8674 20.8436,27.4553 C20.7362,28.9853 20.7136,31.674 20.8046,33.7353 C21.8163078,30.9502281 23.0617808,28.2557231 24.5277,25.6806 C24.6756,25.4267 24.8861,25.33 25.222,25.6825 C25.7952024,26.2732426 25.9457879,27.1558111 25.6009,27.9032 C24.7645,30.0399 23.0921,34.038 22.0277,37.4296 C21.8851,37.8603 21.6254,37.8983 21.1507,37.7206 C20.6513309,37.5237885 20.1720838,37.279326 19.7196,36.9906 C19.2605817,36.7075686 18.9584084,36.2280198 18.9012,35.6918 C18.644698,33.8189374 18.5443524,31.9279909 18.6012,30.0385 C17.508656,32.5883411 16.5468078,35.1922201 15.7194,37.84 L15.7194,37.84 Z M31.4172,31.042 C31.7736992,31.0050959 32.1281029,31.1289612 32.384,31.3799 C32.622107,31.6219126 32.8373544,31.8853982 33.027,32.167 C33.2126,32.4619 33.133,32.6182 32.8527,32.6562 C31.5152369,32.8308529 30.187874,33.075657 28.8761,33.3896 C28.5627,34.1934 28.2638,34.957 28.0007,35.6836 C28.9964082,35.4944611 30.0076871,35.3993095 31.0212,35.3994 C31.4138803,35.3668248 31.8039649,35.4872036 32.11,35.7354 C32.3995627,35.9891802 32.6539437,36.2804874 32.8664,36.6016 C33.0837,36.9756 32.9396,37.1123 32.5978,37.1504 C30.9626482,37.3414594 29.342494,37.6442338 27.7487,38.0566 C27.0656,38.2715 26.9087,38.1719 26.5687,37.9346 C26.2746939,37.7506414 25.9984371,37.5397328 25.7435,37.3046 C25.4023049,37.0780125 25.2639435,36.645062 25.4105,36.2626 C26.2296733,33.2287792 27.3080403,30.2709647 28.6337,27.4218 C28.4926,27.1474 28.3422,26.8124 28.2537,26.6151 C28.0984,26.2421 28.2156,26.0663 28.5691,25.9696 C30.4992291,25.5594221 32.4674764,25.3554774 34.4407,25.3612 C34.8994747,25.3320156 35.3518611,25.4806742 35.7039,25.7763 C36.0097758,26.0715756 36.2711981,26.409663 36.48,26.78 C36.6333,27.1345 36.4839,27.2311 36.101,27.27 C34.4838941,27.4166179 32.8754713,27.6469266 31.2822,27.96 C30.8222,28.8809 30.3266,29.9786 29.8188,31.1348 C30.4631,31.0791 31.03,31.041 31.4172,31.042 Z M43.9865,26.335 C44.2795,25.9629 44.5744,25.8867 44.923,26.1816 C45.2674636,26.4543532 45.5738824,26.7719714 45.8341,27.126 C46.1115,27.5 46.1554,27.6572 45.9826,28.3037 C45.4015291,30.3743665 45.0218326,32.4963202 44.8488,34.64 C46.3077227,31.4191176 48.0671455,28.3429989 50.1037,25.4525 C50.1639995,25.3237683 50.2919046,25.2401996 50.4340155,25.2366834 C50.5761264,25.2331671 50.7080079,25.310308 50.7746,25.4359 C51.2509704,26.1176817 51.2589178,27.0222536 50.7946,27.7123 C48.9636552,30.97652 47.3130449,34.3386652 45.8502,37.7836 C45.6667,38.2152 45.4127,38.1547 44.9157,37.9574 C44.4138896,37.7488719 43.9374816,37.4838281 43.4957,37.1674 C43.053661,36.8341142 42.8027018,36.3056023 42.8238,35.7524 C42.7719013,34.0381384 42.9379296,32.324226 43.3179,30.6518 C42.0504949,32.9259551 40.9075448,35.2672702 39.8941,37.6654 C39.6822,38.1762 39.358,38.1947 38.9595,37.976 C38.4576422,37.7322683 37.9838163,37.434614 37.5464,37.0883 C37.0357,36.6547 36.7664,36.3412 36.8619,34.7318 C37.0725813,31.7007069 37.5504701,28.6941337 38.29,25.7471 C38.3847,25.4131 38.5722,25.2971 38.9326,25.5322 C39.3089201,25.8030405 39.6492232,26.1206949 39.9453,26.4775 C40.1964726,26.8235556 40.2679146,27.2685085 40.1377,27.6758 C39.7871,29.3623 39.2343,32.4824 39.0439,34.2871 C40.3853411,31.4579789 42.0434818,28.7902129 43.9865,26.335 L43.9865,26.335 Z" />
      </svg>
    );
  }
}
