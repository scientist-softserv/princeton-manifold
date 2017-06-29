import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connectAndFetch from 'utils/connectAndFetch';
import { List, Resource } from 'components/backend';
import { projectsAPI, requests } from 'api';
import { entityStoreActions } from 'actions';
import { select, meta } from 'utils/entityUtils';
import lh from 'helpers/linkHandler';

const { request } = entityStoreActions;
const perPage = 5;

export class ProjectDetailResourcesList extends PureComponent {

  static displayName = "ProjectDetail.ResourcesList";

  static mapStateToProps(state) {
    return {
      resources: select(requests.beResources, state.entityStore),
      resourcesMeta: meta(requests.beResources, state.entityStore)
    };
  }

  static propTypes = {
    route: PropTypes.object,
    project: PropTypes.object,
    dispatch: PropTypes.func,
    editSession: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { filter: {} };
    this.lastFetchedPage = null;
    this.pageChangeHandlerCreator = this.pageChangeHandlerCreator.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
  }

  componentDidMount() {
    this.fetchResources(1);
  }

  fetchResources(page) {
    this.lastFetchedPage = page;
    const pagination = { number: page, size: perPage };
    const action = request(
      projectsAPI.resources(this.props.project.id, this.state.filter, pagination),
      requests.beResources
    );
    this.props.dispatch(action);
  }

  filterChangeHandler(filter) {
    this.setState({ filter }, () => {
      this.fetchResources(1);
    });
  }

  handleResourcesPageChange(event, page) {
    this.fetchResources(page);
  }

  pageChangeHandlerCreator(page) {
    return (event) => {
      this.handleResourcesPageChange(event, page);
    };
  }

  render() {
    if (!this.props.resources) return null;
    const project = this.props.project;

    return (
      <div className="project-resource-list">
        <header className="section-heading-secondary">
          <h3>
            {'Resources'} <i className="manicon manicon-cube-shine"></i>
          </h3>
        </header>
        <List.Searchable
          newButtonVisible
          newButtonPath={lh.link("backendProjectResourcesNew", project.id)}
          newButtonText="Add a New Resource"
          entities={this.props.resources}
          singularUnit="resource"
          pluralUnit="resources"
          pagination={this.props.resourcesMeta.pagination}
          paginationClickHandler={this.pageChangeHandlerCreator}
          entityComponent={Resource.ListItem}
          filterChangeHandler={this.filterChangeHandler}
          filterOptions={{
            tag: this.props.project.attributes.resourceTags,
            kind: this.props.project.attributes.resourceKinds
          }}
        />
      </div>
    );
  }
}

export default connectAndFetch(ProjectDetailResourcesList);
