import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'components/backend';

export default class DialogConfirm extends PureComponent {

  static displayName = "Dialog.Confirm";

  static propTypes = {
    resolve: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired,
    heading: PropTypes.string,
    message: PropTypes.string
  };

  static defaultProps = {
    heading: "Are you sure?"
  };

  static contextTypes = {
    pauseKeyboardEvents: PropTypes.func,
    unpauseKeyboardEvents: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleResolveClick = this.handleResolveClick.bind(this);
    this.handleRejectClick = this.handleRejectClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    if (this.context.pauseKeyboardEvents) this.context.pauseKeyboardEvents();
    window.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    if (this.context.unpauseKeyboardEvents) this.context.unpauseKeyboardEvents();
    window.removeEventListener('keyup', this.handleKeyPress);
  }

  handleKeyPress(event) {
    event.preventDefault();
    if (event.keyCode === 27) return this.handleRejectClick(event);
    if (event.keyCode === 13) return this.handleResolveClick(event);
  }

  handleResolveClick(event) {
    event.preventDefault();
    this.props.resolve(event);
  }

  handleRejectClick(event) {
    event.preventDefault();
    this.props.reject(event);
  }

  render() {
    return (
      <Dialog.Wrapper
        className="dialog-confirm"
        maxWidth={400}
        showCloseButton={false}
        closeOnOverlayClick={false}
      >
        <header className="dialog-header-small">
          <h2>{this.props.heading}</h2>
        </header>

        { this.props.message ?
          <p>
            {this.props.message}
          </p>
          : null
        }

        <div className="buttons-icon-horizontal">
          <button
            onClick={this.handleResolveClick}
            className="button-icon-secondary"
            data-id="accept"
          >
            <i className="manicon manicon-check small"></i>
            Yes
          </button>
          <button
            className="button-icon-secondary dull"
            onClick={this.handleRejectClick}
            data-id="reject"
          >
            <i className="manicon manicon-x small"></i>
            No
          </button>
        </div>
      </Dialog.Wrapper>
    );
  }

}
