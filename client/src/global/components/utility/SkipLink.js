import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class SkipLink extends PureComponent {
  static propTypes = {
    skipId: PropTypes.string,
    skipLinkText: PropTypes.string,
    skipMessage: PropTypes.string
  };

  static defaultProps = {
    skipId: "skip-to-main",
    skipLinkText: "Skip to main content",
    skipMessage: "Skipped to Main Content"
  };

  constructor(props) {
    super(props);
    this.state = { skipped: false };
  }

  activateSkipMessage = () => {
    this.setState({ skipped: true });
  };

  render() {
    return (
      <>
        <a
          className="skip-to-main"
          href={`#${this.props.skipId}`}
          onClick={this.activateSkipMessage}
        >
          {this.props.skipLinkText}
        </a>
        <span className="screen-reader-text" role="alert">
          {this.state.skipped && this.props.skipMessage}
        </span>
      </>
    );
  }
}
