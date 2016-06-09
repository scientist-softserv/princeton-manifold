import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import get from 'lodash/get';
import {
  EventList,
  PublishedText,
  GroupedTexts,
  MetaAttributes,
  ProjectDetailHero
} from '../../components/frontend';
import {
  visibilityShow
} from '../../actions/shared/ui/visibility';
import { request, flush, requests } from '../../actions/shared/entityStore';
import { select } from '../../utils/entityUtils';
import projectsAPI from '../../api/projects';


class ProjectDetailContainer extends Component {

  static fetchData(getState, dispatch, location, params) {
    const projectRequest =
      request(projectsAPI.show(params.id), requests.showProjectDetail);
    const { promise: one } = dispatch(projectRequest);
    return Promise.all([one]);
  }

  static mapStateToProps(state) {
    return {
      project: select(requests.showProjectDetail, state.entityStore)
    };
  }

  static propTypes = {
    project: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      activity: [],
      categories: [],
      texts: [],
      meta: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderActivity = () => {
    if (!this.state.activity.length > 0) return null;
    return (
        <section>
          <div className="container">
            <header className="rel">
              <h4 className="section-heading">
                <i className="manicon manicon-pulse"></i>
                {'Recent Activity'}
              </h4>
              <div className="section-heading-utility-right">
                <Link to={`#`} className="button-primary">
                  See all Activity
                </Link>
              </div>
            </header>
            <EventList events={this.state.activity} />
          </div>
        </section>
    );
  };

  renderMeta = () => {
    if (!this.state.meta.length > 0) return null;
    return (
      <section>
        <div className="container">
          <header className="rel">
            <h4 className="section-heading">
              <i className="manicon manicon-tag"></i>
                {'Metadata'}
            </h4>
          </header>
          <MetaAttributes data={this.state.meta} />
        </div>
      </section>
    );
  };

  renderTexts = () => {
    const project = this.props.project;
    const texts = get(this.props, 'project.relationships.texts');
    if (!texts || texts.length === 0) return null;
    return (
      <section>
        <div className="container">
          <header className="rel">
            <h4 className="section-heading">
              <i className="manicon manicon-books-stack"></i>
              {'Texts'}
            </h4>
          </header>
          <PublishedText text={project.relationships.publishedText} />
          <GroupedTexts
            categories={project.relationships.textCategories}
            texts={project.relationships.texts}
          />
        </div>
      </section>
    );
  };

  render() {
    if (!this.props.project) return null;
    return (
      <div>
        <section className="bg-neutral05">
          <div className="container">
            <ProjectDetailHero
              project={this.props.project}
              visibilityShow={bindActionCreators((el) => visibilityShow(el), this.props.dispatch)}
            />
          </div>
        </section>
        {this.renderActivity()}
        {this.renderTexts()}
        {this.renderMeta()}
      </div>
    );
  }
}

const ProjectDetail = connect(
  ProjectDetailContainer.mapStateToProps
)(ProjectDetailContainer);

export default ProjectDetail;
