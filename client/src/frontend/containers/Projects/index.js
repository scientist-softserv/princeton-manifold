import React, { Component } from "react";
import PropTypes from "prop-types";
import Layout from "frontend/components/layout";
import ProjectList from "frontend/components/project-list";
import connectAndFetch from "utils/connectAndFetch";
import { entityStoreActions } from "actions";
import { select, meta } from "utils/entityUtils";
import { projectsAPI, requests } from "api";
import get from "lodash/get";
import queryString from "query-string";
import omitBy from "lodash/omitBy";
import debounce from "lodash/debounce";
import withSettings from "hoc/with-settings";
import EntityCollection from "global/components/composed/EntityCollection";

const { request } = entityStoreActions;
const defaultPage = 1;
const perPage = 20;

export class ProjectsContainer extends Component {
  static fetchData = (getState, dispatch, location) => {
    const search = queryString.parse(location.search);

    const baseFilters = {
      standaloneModeEnforced: false
    };

    const { page, ...filters } = search;
    const pagination = {
      number: page || defaultPage,
      size: perPage
    };

    const projectsFetch = projectsAPI.index(
      Object.assign(baseFilters, filters),
      pagination
    );

    const projectsAction = request(projectsFetch, requests.feProjectsFiltered);
    const { promise: one } = dispatch(projectsAction);
    const promises = [one];
    return Promise.all(promises);
  };

  static mapStateToProps = state => {
    return {
      projects: select(requests.feProjectsFiltered, state.entityStore),
      subjects: select(requests.feSubjects, state.entityStore),
      projectsMeta: meta(requests.feProjectsFiltered, state.entityStore),
      authentication: state.authentication
    };
  };

  static propTypes = {
    authentication: PropTypes.object,
    projects: PropTypes.array,
    location: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func,
    fetchData: PropTypes.func.isRequired,
    subjects: PropTypes.array,
    projectsMeta: PropTypes.object,
    settings: PropTypes.object
  };

  static defaultProps = {
    location: {}
  };

  constructor(props) {
    super(props);
    this.state = this.initialState(queryString.parse(props.location.search));
    this.updateResults = debounce(this.updateResults.bind(this), 250);
  }

  get hasVisibleProjects() {
    return get(this.props.settings, "attributes.calculated.hasVisibleProjects");
  }

  initialFilterState(init = {}) {
    const filter = omitBy(init, (vIgnored, k) => k === "page");
    filter.standaloneModeEnforced = false;
    return filter;
  }

  initialState(init = {}) {
    return {
      filter: { ...this.initialFilterState(init) },
      pagination: {
        number: init.page || defaultPage,
        size: perPage
      }
    };
  }

  updateUrl() {
    const pathname = this.props.location.pathname;
    const filters = this.state.filter;
    const pageParam = this.state.pagination.number;
    const params = { ...filters };
    if (pageParam !== 1) params.page = pageParam;

    const search = queryString.stringify(params);
    this.props.history.push({ pathname, search });
  }

  updateResults(filter = this.state.filter) {
    const action = request(
      projectsAPI.index(filter, this.state.pagination),
      requests.feProjectsFiltered
    );
    this.props.dispatch(action);
  }

  doUpdate() {
    this.updateResults();
    this.updateUrl();
  }

  filterChangeHandler = filter => {
    this.setState({ filter }, this.doUpdate);
  };

  handlePageChange = pageParam => {
    const pagination = { ...this.state.pagination, number: pageParam };
    this.setState({ pagination }, this.doUpdate);
  };

  pageChangeHandlerCreator = pageParam => {
    return event => {
      event.preventDefault();
      this.handlePageChange(pageParam);
    };
  };

  showPlaceholder() {
    const { location, projects } = this.props;
    if (location.search) return false; // There are search filters applied, skip the check
    if (!projects || projects.length === 0) return true;
  }

  renderProjectLibrary() {
    if (this.showPlaceholder()) return <ProjectList.Placeholder />;

    return (
      <EntityCollection.Projects
        projects={this.props.projects}
        projectsMeta={this.props.projectsMeta}
        filterProps={{
          filterChangeHandler: this.filterChangeHandler,
          initialFilterState: this.state.filter,
          resetFilterState: this.initialFilterState(),
          subjects: this.props.subjects
        }}
        paginationProps={{
          paginationClickHandler: this.pageChangeHandlerCreator
        }}
        bgColor="neutral05"
      />
    );
  }

  render() {
    if (!this.props.projectsMeta) return null;

    return (
      <>
        <h1 className="screen-reader-text">All Projects</h1>
        {this.renderProjectLibrary()}
        {this.hasVisibleProjects && (
          <Layout.ButtonNavigation
            showProjectCollections
            showProjects={false}
            grayBg={false}
          />
        )}
      </>
    );
  }
}

export default connectAndFetch(withSettings(ProjectsContainer));
