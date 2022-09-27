import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { childRoutes } from "helpers/router";
import lh from "helpers/linkHandler";
import PermissionsContainer from "backend/containers/permission";
import EntitlementsContainer from "backend/containers/entitlements";
import Authorize from "hoc/Authorize";
import Layout from "backend/components/layout";
import FormContainer from "global/containers/form";
import Form from "global/components/form";
import Hero from "backend/components/hero";
import withSettings from "hoc/withSettings";

class ProjectAccessWrapper extends Component {
  static displayName = "Project.Access.Wrapper";

  static propTypes = {
    project: PropTypes.object,
    route: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    t: PropTypes.func
  };

  get defaultIsRestricted() {
    return this.props.settings.attributes.general.restrictedAccess === true;
  }

  // This didn't seem to be in use, but can add                 initialVisible={this.defaultIsOpen} as a prop on `Hero.Block` if this is the expected behavior. -LD
  get defaultIsOpen() {
    return !this.defaultIsRestricted;
  }

  render() {
    const { project, updateProject, t } = this.props;
    if (!project) return null;

    const closeUrl = lh.link("backendProjectAccess", project.id);
    return (
      <>
        <Authorize
          entity={project}
          ability="update"
          failureNotification
          failureRedirect={lh.link("backendProject", project.id)}
        >
          <Layout.BackendPanel flush>
            <PermissionsContainer.List entity={project} />
          </Layout.BackendPanel>
          <Layout.BackendPanel>
            <EntitlementsContainer.List
              entity={project}
              preList={
                <div style={{ marginBottom: 44, marginTop: 22 }}>
                  <Hero.Block
                    title={t("backend_entities.projects.forms.access.title")}
                    description={t(
                      "backend_entities.projects.forms.access.description"
                    )}
                  >
                    <FormContainer.Form
                      style={{ paddingTop: 24, paddingBottom: 24 }}
                      model={project}
                      name="backend-project-update"
                      update={updateProject}
                      className="form-secondary"
                    >
                      {this.defaultIsOpen && (
                        <Form.Switch
                          className="form-toggle-secondary"
                          label={t(
                            "backend_entities.projects.forms.access.restricted_label"
                          )}
                          name="attributes[restrictedAccess]"
                          wide
                        />
                      )}
                      {this.defaultIsRestricted && (
                        <Form.Switch
                          className="form-toggle-secondary"
                          label={t(
                            "backend_entities.projects.forms.access.open_access_label"
                          )}
                          name="attributes[openAccess]"
                          wide
                        />
                      )}
                      <Form.TextInput
                        className="form-toggle-secondary"
                        label={t(
                          "backend_entities.projects.forms.access.notice_header_label"
                        )}
                        name="attributes[restrictedAccessHeading]"
                        placeholder={t(
                          "backend_entities.projects.forms.access.notice_header_placeholder"
                        )}
                        wide
                      />
                      <Form.TextArea
                        className="form-toggle-secondary"
                        label={t(
                          "backend_entities.projects.forms.access.notice_body_label"
                        )}
                        name="attributes[restrictedAccessBody]"
                        placeholder={t(
                          "backend_entities.projects.forms.access.notice_body_placeholder"
                        )}
                      />
                      <Form.Save
                        text={t("backend_entities.projects.forms.access.save")}
                      />
                    </FormContainer.Form>
                  </Hero.Block>
                </div>
              }
            />
          </Layout.BackendPanel>
        </Authorize>
        {childRoutes(this.props.route, {
          drawer: true,
          drawerProps: { closeUrl, lockScroll: "always" },
          childProps: {
            entity: project,
            closeUrl,
            history: this.props.history
          }
        })}
      </>
    );
  }
}

export default withTranslation()(withSettings(ProjectAccessWrapper));
