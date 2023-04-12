import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function BlockQuote(props) {
  const { className, size, fill, svgProps } = props;

  const getSize = () => {
    if (size === "inherit") return null;
    if (!size || size === "default") return 24;
    return size;
  };
  const baseSvgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    className: classNames("manicon-svg", className),
    width: getSize(),
    height: getSize(),
    viewBox: "0 0 24 24",
    fill
  };
  return (
    <svg {...baseSvgProps} {...svgProps}>
      <path d="M11.5 13.375H7.81875C7.93491 12.6015 8.21112 11.8607 8.62974 11.1999C9.04837 10.5391 9.6002 9.97295 10.25 9.5375L11.3688 8.7875L10.6812 7.75L9.5625 8.5C8.6208 9.12755 7.84857 9.97785 7.31433 10.9755C6.7801 11.9731 6.50038 13.0871 6.5 14.2188V18.375C6.5 18.7065 6.6317 19.0245 6.86612 19.2589C7.10054 19.4933 7.41848 19.625 7.75 19.625H11.5C11.8315 19.625 12.1495 19.4933 12.3839 19.2589C12.6183 19.0245 12.75 18.7065 12.75 18.375V14.625C12.75 14.2935 12.6183 13.9755 12.3839 13.7411C12.1495 13.5067 11.8315 13.375 11.5 13.375ZM20.25 13.375H16.5688C16.6849 12.6015 16.9611 11.8607 17.3797 11.1999C17.7984 10.5391 18.3502 9.97295 19 9.5375L20.1188 8.7875L19.4375 7.75L18.3125 8.5C17.3708 9.12755 16.5986 9.97785 16.0643 10.9755C15.5301 11.9731 15.2504 13.0871 15.25 14.2188V18.375C15.25 18.7065 15.3817 19.0245 15.6161 19.2589C15.8505 19.4933 16.1685 19.625 16.5 19.625H20.25C20.5815 19.625 20.8995 19.4933 21.1339 19.2589C21.3683 19.0245 21.5 18.7065 21.5 18.375V14.625C21.5 14.2935 21.3683 13.9755 21.1339 13.7411C20.8995 13.5067 20.5815 13.375 20.25 13.375Z" />
    </svg>
  );
}

BlockQuote.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stroke: PropTypes.string,
  fill: PropTypes.string,
  svgProps: PropTypes.object
};

export default BlockQuote;
