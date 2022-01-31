import React, { Component } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import { commonActions } from "actions/helpers";
import get from "lodash/get";
import Collections from "./Collections";
import Projects from "./Projects";
import Feature from "./Feature";
import withSettings from "hoc/withSettings";
import Layout from "frontend/components/layout";
import EventTracker, { EVENTS } from "global/components/EventTracker";

export class HomeContainer extends Component {
  static showProjects(settings) {
    return !get(
      settings,
      "attributes.calculated.hasVisibleHomeProjectCollections"
    );
  }

  static mapStateToProps = state => {
    return {
      authentication: state.authentication
    };
  };

  static propTypes = {
    fetchData: PropTypes.func,
    authentication: PropTypes.object,
    settings: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    location: {}
  };

  constructor(props) {
    super(props);
    this.commonActions = commonActions(props.dispatch);
  }

  get showProjects() {
    return this.constructor.showProjects(this.props.settings);
  }

  get hasVisibleProjects() {
    return get(this.props.settings, "attributes.calculated.hasVisibleProjects");
  }

  render() {
    return (
      <div
        style={{
          overflowX: "hidden"
        }}
      >
        <EventTracker event={EVENTS.VIEW_LIBRARY} />
        <Feature
          authentication={this.props.authentication}
          commonActions={this.commonActions}
        />
        {this.showProjects ? (
          <Projects
            location={this.props.location}
            authentication={this.props.authentication}
          />
        ) : (
          <Collections authentication={this.props.authentication} />
        )}

        {this.hasVisibleProjects && <Layout.ButtonNavigation grayBg={false} />}
      </div>
    );
  }
}

export default connectAndFetch(withSettings(HomeContainer));
