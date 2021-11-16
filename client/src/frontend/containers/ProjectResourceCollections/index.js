import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import connectAndFetch from "utils/connectAndFetch";
import { entityStoreActions } from "actions";
import CheckFrontendMode from "global/containers/CheckFrontendMode";
import { projectsAPI, requests } from "api";
import { select, meta } from "utils/entityUtils";
import lh from "helpers/linkHandler";
import LoadingBlock from "global/components/loading-block";
import HeadContent from "global/components/HeadContent";
import BackLink from "frontend/components/back-link";
import ContentPlaceholder from "global/components/ContentPlaceholder";
import EntityCollection from "global/components/composed/EntityCollection";
import withSettings from "hoc/with-settings";
import Authorize from "hoc/authorize";

const { request, flush } = entityStoreActions;
const defaultPage = 1;
const perPage = 10;

class ProjectResourceCollectionsContainer extends Component {
  static fetchData = (getState, dispatch, location, match) => {
    const pagination = {
      number: defaultPage,
      size: perPage
    };
    const resourceCollectionRequest = request(
      projectsAPI.resourceCollections(match.params.id, {}, pagination),
      requests.feResourceCollections
    );
    const { promise: one } = dispatch(resourceCollectionRequest);
    return Promise.all([one]);
  };

  static mapStateToProps = state => {
    return {
      resourceCollections: select(
        requests.feResourceCollections,
        state.entityStore
      ),
      resourceCollectionsMeta: meta(
        requests.feResourceCollections,
        state.entityStore
      )
    };
  };

  static propTypes = {
    project: PropTypes.object,
    resourceCollections: PropTypes.array,
    resourceCollectionsMeta: PropTypes.object,
    settings: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.dispatch(flush(requests.feResourceCollections));
  }

  fetchResourceCollections(pageParam = 1) {
    const action = request(
      projectsAPI.resourceCollections(
        this.props.project.id,
        {},
        { number: pageParam, size: perPage }
      ),
      requests.feResourceCollections
    );
    this.props.dispatch(action);
  }

  pageChangeHandlerCreator = pageParam => {
    return event => {
      event.preventDefault();
      this.handlePageChange(pageParam);
    };
  };

  placeholderActions(id) {
    return [
      {
        children: (
          <Authorize entity="project" ability="create">
            <Link
              to={lh.link("backendProjectResourceCollectionsNew", id)}
              className="button-tertiary"
            >
              Create a Collection
            </Link>
          </Authorize>
        )
      }
    ];
  }

  get hasCollections() {
    return !!this.props.resourceCollections?.length;
  }

  renderPlaceholder(id) {
    return (
      <ContentPlaceholder.Wrapper context="frontend">
        <ContentPlaceholder.Title icon="resourceCollection64">
          <Authorize entity="projectCollection" ability="create">
            Uh-oh. This project doesn’t have any collections yet.
          </Authorize>
          <Authorize entity="project" ability="create" successBehavior="hide">
            This project doesn’t have any collections yet.
          </Authorize>
        </ContentPlaceholder.Title>
        <ContentPlaceholder.Body>
          <>
            <Authorize entity="project" ability="create">
              <p>
                Resource collections are groupings of resources that can be used
                to orient a reader around certain themes or as a means to place
                a series of resources onto a text with one insertion.
              </p>
            </Authorize>
            <Authorize entity="project" ability="create" successBehavior="hide">
              <p>Please check back soon!</p>
            </Authorize>
          </>
        </ContentPlaceholder.Body>
        <ContentPlaceholder.Actions actions={this.placeholderActions(id)} />
      </ContentPlaceholder.Wrapper>
    );
  }

  render() {
    const { project, settings } = this.props;
    if (!project) return <LoadingBlock />;

    return (
      <>
        <CheckFrontendMode
          debugLabel="ProjectResourceCollections"
          isProjectSubpage
        />
        <HeadContent
          title={`View \u201c${project.attributes.titlePlaintext}\u201d Resource Collections on ${settings.attributes.general.installationName}`}
          description={project.attributes.description}
          image={project.attributes.heroStyles.medium}
        />
        <h1 className="screen-reader-text">
          {`${project.attributes.titlePlaintext} Resource Collections`}
        </h1>
        <BackLink.Register
          link={lh.link("frontendProjectDetail", project.attributes.slug)}
          title={project.attributes.titlePlaintext}
        />
        {!this.hasCollections ? (
          this.renderPlaceholder(project.id)
        ) : (
          <EntityCollection.ProjectResourceCollections
            resourceCollections={this.props.resourceCollections}
            resourceCollectionsMeta={this.props.resourceCollectionsMeta}
            paginationProps={{
              paginationClickHandler: this.pageChangeHandlerCreator
            }}
            itemHeadingLevel={2}
          />
        )}
      </>
    );
  }
}

export default connectAndFetch(
  withSettings(ProjectResourceCollectionsContainer)
);
