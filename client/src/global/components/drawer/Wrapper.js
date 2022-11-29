import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import FocusTrap from "focus-trap-react";
import tabbable from "tabbable";
import has from "lodash/has";
import isString from "lodash/isString";
import classNames from "classnames";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { UIDConsumer } from "react-uid";
import Utility from "global/components/utility";
import Notifications from "global/containers/Notifications";
import { notificationActions } from "actions";
import { DrawerContext } from "helpers/contexts";

class DrawerWrapper extends PureComponent {
  static mapStateToProps() {
    return {
      connected: true
    };
  }

  static displayName = "Drawer.Wrapper";

  static propTypes = {
    dispatch: PropTypes.func,
    connected: PropTypes.bool.isRequired,
    open: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    icon: PropTypes.string,
    identifier: PropTypes.string,
    closeUrl: PropTypes.string,
    closeCallback: PropTypes.func,
    lockScroll: PropTypes.string,
    lockScrollClickCloses: PropTypes.bool,
    entrySide: PropTypes.oneOf(["right", "left"]),
    context: PropTypes.oneOf(["backend", "frontend", "reader"]),
    size: PropTypes.oneOf(["default", "wide", "flexible"]),
    position: PropTypes.oneOf(["default", "overlay"]),
    padding: PropTypes.oneOf(["none", "default", "large"]),
    history: PropTypes.object,
    includeDrawerFrontMatter: PropTypes.bool,
    returnFocusOnDeactivate: PropTypes.bool,
    focusTrap: PropTypes.bool,
    includeSRCloseButton: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    t: PropTypes.func
  };

  static childContextTypes = {
    pauseKeyboardEvents: PropTypes.func,
    unpauseKeyboardEvents: PropTypes.func
  };

  // NB lockScroll can be:
  // Hover (default): User can scroll the drawer on hover, but it doesn't effect body scroll
  // unless they intentionally do so.
  // Always: Having the drawer open locks the body scroll until it is closed
  // None: Scrolling the drawer invokes default browser behavior
  static defaultProps = {
    connected: false,
    lockScroll: "hover",
    lockScrollClickCloses: true,
    open: false,
    context: "backend",
    size: "default",
    padding: "default",
    position: "default",
    entrySide: "right",
    includeDrawerFrontMatter: true,
    returnFocusOnDeactivate: true,
    focusTrap: true,
    includeSRCloseButton: false
  };

  constructor(props) {
    super(props);
    this.state = {
      leaving: false,
      keyboardEventsPaused: false,
      focusable: false
    };
    this.focusTrapNode = React.createRef();
    this.scrollableNode = React.createRef();
    if (props.open) {
      this.onOpen();
    }
  }

  getChildContext() {
    return {
      pauseKeyboardEvents: this.pauseKeyboardEvents,
      unpauseKeyboardEvents: this.unpauseKeyboardEvents
    };
  }

  static getDerivedStateFromProps(nextProps, prevStateIgnored) {
    if (React.Children.count(nextProps.children) <= 0) {
      return { focusable: false };
    }

    return null;
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleLeaveKey);
    this.enableScrollLock();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.onOpen();
      this.enableScrollLock();
    }

    if (prevProps.open && !this.props.open) {
      this.disableScrollLock();
    }

    if (this.props.open && has(this.focusTrapNode, "current.node")) {
      if (tabbable(this.focusTrapNode.current.node).length > 0) {
        this.setState({ focusable: true });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleLeaveKey);
    this.disableScrollLock();
  }

  onOpen() {
    this.clearGlobalNotifications();
  }

  enableScrollLock() {
    if (!this.canLockScroll) return;
    disableBodyScroll(this.scrollableNode.current);
  }

  disableScrollLock() {
    if (!this.canLockScroll) return;
    enableBodyScroll(this.scrollableNode.current);
  }

  clearDrawerNotifications() {
    if (this.props.dispatch)
      this.props.dispatch(notificationActions.removeNotifications("drawer"));
  }

  clearGlobalNotifications() {
    if (this.props.dispatch)
      this.props.dispatch(notificationActions.removeNotifications("global"));
  }

  handleLeaveKey = event => {
    if (this.state.keyboardEventsPaused) return null;
    if (event.keyCode === 27) {
      this.handleLeaveEvent(event);
    }
  };

  pauseKeyboardEvents = () => {
    this.setState({ keyboardEventsPaused: true });
  };

  unpauseKeyboardEvents = () => {
    this.setState({ keyboardEventsPaused: false });
  };

  handleLeaveEvent = event => {
    this.setState({ leaving: true });

    this.clearDrawerNotifications();

    /*
      NB: Running this callback without a timeout causes the drawer
      to close without a transition. However, running a timeout causes
      an error as well.
    */
    if (this.props.closeCallback) {
      this.props.closeCallback(event);
    }

    if (this.props.closeUrl) {
      setTimeout(() => {
        this.props.history.push(this.props.closeUrl, { noScroll: true });
      }, 200);
    }
  };

  get canLockScroll() {
    return this.props.lockScroll === "always" && this.scrollableNode.current;
  }

  get closesOnClickOutside() {
    if (this.props.closeUrl) return true;
    return (
      this.props.closeCallback && typeof this.props.closeCallback === "function"
    );
  }

  get drawerClasses() {
    return classNames(
      "drawer",
      [`drawer--${this.props.context}`],
      [`drawer--${this.props.entrySide}`],
      [`drawer--${this.props.size}`],
      [`drawer--pad-${this.props.padding}`],
      [`drawer--pos-${this.props.position}`]
    );
  }

  get drawerBarClasses() {
    return classNames({
      "drawer-bar": true,
      "drawer-bar--pad-lateral": this.props.padding === "none",
      "drawer-bar--default": this.props.context !== "reader",
      "drawer-bar--reader": this.props.context === "reader"
    });
  }

  get closeButtonClasses() {
    return classNames({
      "drawer-bar__close-button": true,
      "drawer-bar__close-button--light": this.props.context === "backend",
      "drawer-bar__close-button--dark": this.props.context !== "backend"
    });
  }

  get overlayClasses() {
    return classNames(
      "drawer-overlay",
      [`drawer-overlay--${this.props.context}`],
      [`drawer-overlay--pos-${this.props.position}`]
    );
  }

  renderDrawerFrontMatter(props, headerId) {
    const hasTitle = props.title || props.icon;
    const hasClose = props.closeCallback || props.closeUrl;
    const t = this.props.t;

    return (
      <>
        {props.includeDrawerFrontMatter && (
          <div className={this.drawerBarClasses}>
            {hasTitle ? (
              <div className="drawer-bar__title">
                {props.icon && (
                  <Utility.IconComposer
                    icon={props.icon}
                    size={24}
                    className="drawer-bar__title-icon"
                  />
                )}
                {props.title && (
                  <span id={headerId} className="drawer-bar__title-text">
                    {typeof props.title === "object"
                      ? t(props.title.key)
                      : props.title}
                  </span>
                )}
              </div>
            ) : null}
            {hasClose ? (
              <button
                onClick={this.handleLeaveEvent}
                tabIndex="0"
                className={this.closeButtonClasses}
              >
                <span className="drawer-bar__close-text">
                  {t("actions.close")}
                </span>
                <Utility.IconComposer
                  icon="close24"
                  size={24}
                  className="drawer-bar__close-icon"
                />
              </button>
            ) : null}
          </div>
        )}
        {props.includeSRCloseButton && (
          <button
            onClick={this.handleLeaveEvent}
            tabIndex="0"
            className="screen-reader-text"
          >
            {t("actions.close")}
          </button>
        )}
      </>
    );
  }

  renderDrawer(headerId) {
    return (
      <div
        key="drawer"
        className={this.drawerClasses}
        ref={this.scrollableNode}
        id={this.props.id}
        role="dialog"
        aria-modal={this.props.focusTrap}
        aria-label={this.props.ariaLabel}
        aria-labelledby={headerId}
      >
        <FocusTrap
          ref={this.focusTrapNode}
          active={this.state.focusable && this.props.focusTrap}
          focusTrapOptions={{
            escapeDeactivates: false,
            returnFocusOnDeactivate: this.props.returnFocusOnDeactivate,
            clickOutsideDeactivates: this.closesOnClickOutside
          }}
        >
          {this.renderDrawerFrontMatter(this.props, headerId)}
          {this.props.connected && (
            <Notifications scope="drawer" style="drawer" animate={false} />
          )}
          {/* Render children without props if they aren't a component */}
          <DrawerContext.Provider value={{ headerId }}>
            {this.renderChildren()}
          </DrawerContext.Provider>
        </FocusTrap>
      </div>
    );
  }

  renderChildren() {
    if (!this.props.children) return null;
    if (isString(this.props.children.type)) return this.props.children;
    return React.cloneElement(this.props.children, {
      closeDrawer: this.handleLeaveEvent
    });
  }

  renderDrawerWrapper(headerId) {
    if (this.props.lockScroll === "hover") {
      return (
        <div className={this.props.identifier}>
          <Utility.EdgeLockScroll>
            {this.renderDrawer(headerId)}
          </Utility.EdgeLockScroll>
        </div>
      );
    }
    if (this.props.lockScroll === "always") {
      return (
        <div className={this.props.identifier}>
          <div className={this.overlayClasses} />
          {this.renderDrawer(headerId)}
        </div>
      );
    }

    return this.renderDrawer(headerId);
  }

  render() {
    return (
      <UIDConsumer name={id => `drawer-header-${id}`}>
        {id => (
          <CSSTransition
            in={this.props.open}
            classNames="drawer"
            timeout={{ enter: 500, exit: 300 }}
            unmountOnExit
          >
            {this.renderDrawerWrapper(id)}
          </CSSTransition>
        )}
      </UIDConsumer>
    );
  }
}

export default withTranslation()(DrawerWrapper);
