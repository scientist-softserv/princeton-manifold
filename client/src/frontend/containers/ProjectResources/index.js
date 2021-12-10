import React, { Component } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import LoadingBlock from "global/components/loading-block";
import { entityStoreActions, uiFrontendModeActions } from "actions";
import { select, meta } from "utils/entityUtils";
import { projectsAPI, requests } from "api";
import queryString from "query-string";
import debounce from "lodash/debounce";
import omitBy from "lodash/omitBy";
import isNull from "lodash/isNull";
import lh from "helpers/linkHandler";
import HeadContent from "global/components/HeadContent";
import { RegisterBreadcrumbs } from "global/components/atomic/Breadcrumbs";
import EntityCollection from "global/components/composed/EntityCollection";
import withSettings from "hoc/with-settings";

const { request, flush } = entityStoreActions;
const defaultPage = 1;
const perPage = 10;

export class ProjectResourcesContainer extends Component {
  static fetchData = (getState, dispatch, location, match) => {
    const params = queryString.parse(location.search);
    const pagination = {
      number: params.page ? params.page : defaultPage,
      size: perPage
    };
    const filter = omitBy(params, (v, k) => k === "page");
    const resourcesRequest = request(
      projectsAPI.resources(match.params.id, filter, pagination),
      requests.feResources
    );
    const { promise: one } = dispatch(resourcesRequest);
    return Promise.all([one]);
  };

  static mapStateToProps = state => {
    const props = {
      resources: select(requests.feResources, state.entityStore),
      resourcesMeta: meta(requests.feResources, state.entityStore)
    };
    return omitBy(props, isNull);
  };

  static propTypes = {
    project: PropTypes.object,
    settings: PropTypes.object.isRequired,
    resources: PropTypes.array,
    resourcesMeta: PropTypes.object,
    dispatch: PropTypes.func,
    location: PropTypes.object.isRequired,
    history: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = this.initialState(queryString.parse(props.location.search));
    this.updateResults = debounce(this.updateResults.bind(this), 250);
  }

  componentDidMount() {
    this.props.dispatch(uiFrontendModeActions.isProjectSubpage());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search === this.props.location.search) return null;
    this.setState(
      this.initialState(queryString.parse(this.props.location.search)),
      this.updateResults
    );
  }

  componentWillUnmount() {
    this.props.dispatch(flush(requests.feResources));
  }

  initialFilterState(init = {}) {
    return omitBy(init, (vIgnored, k) => k === "page");
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

  doUpdate() {
    this.updateResults();
    this.updateUrl();
  }

  updateResults() {
    const action = request(
      projectsAPI.resources(
        this.props.project.id,
        this.state.filter,
        this.state.pagination
      ),
      requests.feResources
    );
    this.props.dispatch(action);
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

  render() {
    const { project, settings, resources, resourcesMeta } = this.props;
    if (!project) return <LoadingBlock />;

    return (
      <div>
        <HeadContent
          title={`View \u201c${project.attributes.titlePlaintext}\u201d Resources on ${settings.attributes.general.installationName}`}
          description={project.attributes.description}
          image={project.attributes.heroStyles.medium}
        />
        <RegisterBreadcrumbs
          breadcrumbs={[
            {
              to: lh.link("frontendProjectDetail", project.attributes.slug),
              label: project.attributes.titlePlaintext
            }
          ]}
        />
        <EntityCollection.ProjectResources
          project={project}
          resources={resources}
          resourcesMeta={resourcesMeta}
          filterProps={{
            filterChangeHandler: this.filterChangeHandler,
            initialFilterState: this.state.filter,
            resetFilterState: this.initialFilterState(),
            project
          }}
          paginationProps={{
            paginationClickHandler: this.pageChangeHandlerCreator
          }}
          itemHeadingLevel={3}
        />
      </div>
    );
  }
}

export default connectAndFetch(withSettings(ProjectResourcesContainer));
