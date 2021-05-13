import React, { Component } from "react";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react";
import Utility from "global/components/utility";
import CloseButton from "global/components/Overlay/Close";
import { withRouter } from "react-router-dom";
import Interface from "./Interface";

import BodyClass from "hoc/body-class";

class Overlay extends Component {
  static propTypes = {
    hideSignInUpOverlay: PropTypes.func,
    authentication: PropTypes.object,
    settings: PropTypes.object,
    dispatch: PropTypes.func
  };

  render() {
    return (
      <BodyClass className={"no-scroll"}>
        <div className="overlay-login">
          <FocusTrap
            focusTrapOptions={{
              onDeactivate: this.props.hideSignInUpOverlay
            }}
          >
            <div className="overlay-header">
              <div className="overlay-header__inner">
                <figure className="overlay-header__logo" aria-hidden="true">
                  <Utility.IconComposer size={26} icon="manifoldLogo32" />
                </figure>
                <CloseButton onClick={this.props.hideSignInUpOverlay} />
              </div>
            </div>
            <div className="overlay-content focus">
              <div className="container">
                <div className="inner login-form">
                  <Interface {...this.props} />
                </div>
              </div>
            </div>
          </FocusTrap>
        </div>
      </BodyClass>
    );
  }
}

export default withRouter(Overlay);
