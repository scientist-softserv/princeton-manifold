import * as Frontend from "containers/frontend";
import * as Reader from "containers/reader";
import * as Backend from "containers/backend";

/* eslint-disable max-len */
export default () => {
  return [
    {
      name: "reader",
      component: Reader.Reader,
      path: "/read/:textId",
      helper: t => `/read/${t}`,
      routes: [
        {
          name: "readerSection",
          component: Reader.Section,
          path: "/read/:textId/section/:sectionId",
          helper: (t, s, anchor = "") => `/read/${t}/section/${s}${anchor}`,
          routes: [
            {
              name: "readerSectionResource",
              component: Reader.Resource.Detail,
              path: "/read/:textId/section/:sectionId/resource/:resourceId",
              helper: (t, s, r) => `/read/${t}/section/${s}/resource/${r}`
            }
          ]
        }
      ]
    },
    {
      name: "backend",
      component: Backend.Backend,
      path: "/backend",
      helper: () => "/backend",
      routes: [
        {
          exact: true,
          component: Backend.Dashboard,
          path: "/backend"
        },
        {
          name: "backendProjectResourcesNew",
          exact: true,
          component: Backend.NewResource.Wrapper,
          path: "/backend/project/:projectId/resources/new",
          helper: p => `/backend/project/${p}/resources/new`
        },
        {
          name: "backendProjectCollectionsNew",
          exact: true,
          component: Backend.NewCollection.Wrapper,
          path: "/backend/project/:projectId/collections/new",
          helper: p => `/backend/project/${p}/collections/new`
        },
        {
          name: "backendPeopleUsersNew",
          exact: true,
          component: Backend.NewUser.Wrapper,
          path: "/backend/people/users/new",
          helper: () => "/backend/people/users/new"
        },
        {
          name: "backendProjectsNew",
          exact: true,
          component: Backend.NewProject.Wrapper,
          path: "/backend/project/new",
          helper: () => "/backend/project/new"
        },
        {
          name: "backendProject",
          exact: false,
          component: Backend.ProjectDetail.Wrapper,
          path: "/backend/project/:id",
          helper: p => `/backend/project/${p}`,
          routes: [
            {
              name: "backendProjectTexts",
              exact: false,
              component: Backend.ProjectDetail.Texts,
              path: "/backend/project/:id/texts",
              helper: p => `/backend/project/${p}/texts`,
              routes: [
                {
                  name: "backendProjectTextsIngestionsNew",
                  exact: false,
                  component: Backend.ProjectDetail.Text.Ingestion.New,
                  path: "/backend/project/:id/texts/ingestions/new",
                  helper: p => `/backend/project/${p}/texts/ingestions/new`,
                  modal: true
                },
                {
                  name: "backendProjectTextsIngestionEdit",
                  exact: false,
                  component: Backend.ProjectDetail.Text.Ingestion.Edit,
                  path:
                    "/backend/project/:id/texts/ingestion/:ingestionId/edit",
                  helper: (p, i) =>
                    `/backend/project/${p}/texts/ingestion/${i}/edit`,
                  modal: true
                },
                {
                  name: "backendProjectTextsIngestionIngest",
                  exact: false,
                  component: Backend.Ingestion.Ingest,
                  path:
                    "/backend/project/:id/texts/ingestion/:ingestionId/ingest",
                  helper: (p, i) =>
                    `/backend/project/${p}/texts/ingestion/${i}/ingest`,
                  modal: true
                },
                {
                  exact: false,
                  component: Backend.ProjectDetail.Category.Wrapper,
                  path: "/backend/project/:id/texts/category",
                  routes: [
                    {
                      name: "backendProjectCategoriesNew",
                      exact: true,
                      component: Backend.ProjectDetail.Category.New,
                      path: "/backend/project/:id/texts/category/new",
                      helper: p => `/backend/project/${p}/texts/category/new`
                    },
                    {
                      name: "backendProjectCategory",
                      exact: true,
                      component: Backend.ProjectDetail.Category.Edit,
                      path: "/backend/project/:id/texts/category/:catId/edit",
                      helper: (p, c) =>
                        `/backend/project/${p}/texts/category/${c}/edit`
                    }
                  ]
                }
              ]
            },
            {
              name: "backendProjectResources",
              exact: true,
              component: Backend.ProjectDetail.Resources,
              path: "/backend/project/:id/resources",
              helper: p => `/backend/project/${p}/resources`
            },
            {
              name: "backendProjectCollections",
              exact: true,
              component: Backend.ProjectDetail.Collections,
              path: "/backend/project/:id/collections",
              helper: p => `/backend/project/${p}/collections`
            },
            {
              name: "backendProjectCollaborators",
              exact: true,
              component: Backend.ProjectDetail.Collaborators,
              path: "/backend/project/:id/collaborators",
              helper: p => `/backend/project/${p}/collaborators`
            },
            {
              name: "backendProjectEvents",
              exact: true,
              component: Backend.ProjectDetail.Events,
              path: "/backend/project/:id/events",
              helper: p => `/backend/project/${p}/events`
            },
            {
              name: "backendProjectMetadata",
              exact: true,
              component: Backend.ProjectDetail.Metadata,
              path: "/backend/project/:id/metadata",
              helper: p => `/backend/project/${p}/metadata`
            },
            {
              exact: true,
              component: Backend.ProjectDetail.General,
              path: "/backend/project/:id"
            }
          ]
        },
        {
          name: "backendPeople",
          exact: false,
          component: Backend.People.Wrapper,
          path: "/backend/people",
          helper: () => "/backend/people",
          routes: [
            {
              name: "backendPeopleMakers",
              component: Backend.People.Makers.List,
              path: "/backend/people/makers/:id?",
              helper: () => `/backend/people/makers`,
              routes: [
                {
                  name: "backendPeopleMaker",
                  component: Backend.People.Makers.Edit,
                  path: "/backend/people/makers/:id?",
                  helper: m => `/backend/people/makers/${m}`
                }
              ]
            },
            {
              name: "backendPeopleUsers",
              exact: true,
              component: Backend.People.Users.List,
              path: "/backend/people/:users(users)?/:id?",
              helper: () => "/backend/people/users",
              routes: [
                {
                  name: "backendPeopleUser",
                  component: Backend.People.Users.Edit,
                  path: "/backend/people/users/:id?",
                  helper: u => `/backend/people/users/${u}`
                }
              ]
            }
          ]
        },
        {
          exact: false,
          component: Backend.TextDetail.Wrapper,
          path: "/backend/text/:id",
          routes: [
            {
              name: "backendTextStyles",
              component: Backend.TextDetail.Styles,
              exact: true,
              path: "/backend/text/:id/styles",
              helper: t => `/backend/text/${t}/styles`
            },
            {
              name: "BackendTextStylesheetNew",
              component: Backend.Stylesheet.Edit,
              exact: true,
              path: "/backend/text/:id/styles/new",
              helper: t => `/backend/text/${t}/styles/new`
            },
            {
              name: "BackendTextStylesheetEdit",
              component: Backend.Stylesheet.Edit,
              exact: true,
              path: "/backend/text/:id/styles/:stylesheet",
              helper: (t, ss) => `/backend/text/${t}/styles/${ss}`
            },
            {
              name: "backendTextMetadata",
              exact: true,
              component: Backend.TextDetail.Metadata,
              path: "/backend/text/:id/metadata",
              helper: t => `/backend/text/${t}/metadata`
            },
            {
              name: "backendTextCollaborators",
              exact: true,
              component: Backend.TextDetail.Collaborators,
              path: "/backend/text/:id/collaborators",
              helper: t => `/backend/text/${t}/collaborators`
            },
            {
              name: "backendTextIngestionsNew",
              exact: true,
              component: Backend.TextDetail.Ingestion.New,
              path: "/backend/text/:id/ingestions/new",
              helper: t => `/backend/text/${t}/ingestions/new`,
              modal: false
            },
            {
              name: "backendTextIngestionEdit",
              exact: false,
              component: Backend.TextDetail.Ingestion.Edit,
              path: "/backend/text/:id/ingestion/:ingestionId/edit",
              helper: (t, i) => `/backend/text/${t}/ingestion/${i}/edit`,
              modal: false
            },
            {
              name: "backendTextIngestionIngest",
              exact: false,
              component: Backend.Ingestion.Ingest,
              path: "/backend/text/:id/ingestion/:ingestionId/ingest",
              helper: (t, i) => `/backend/text/${t}/ingestion/${i}/ingest`,
              modal: false
            },
            {
              name: "backendText",
              exact: true,
              component: Backend.TextDetail.General,
              path: "/backend/text/:id",
              helper: t => `/backend/text/${t}`
            }
          ]
        },
        {
          exact: false,
          component: Backend.ResourceDetail.Wrapper,
          path: "/backend/resource/:id",
          routes: [
            {
              name: "backendResourceVariants",
              exact: true,
              component: Backend.ResourceDetail.Variants,
              path: "/backend/resource/:id/variants",
              helper: r => `/backend/resource/${r}/variants`
            },
            {
              name: "backendResourceMetadata",
              exact: true,
              component: Backend.ResourceDetail.Metadata,
              path: "/backend/resource/:id/metadata",
              helper: r => `/backend/resource/${r}/metadata`
            },
            {
              name: "backendResource",
              exact: true,
              component: Backend.ResourceDetail.General,
              path: "/backend/resource/:id",
              helper: r => `/backend/resource/${r}`
            }
          ]
        },
        {
          exact: false,
          component: Backend.CollectionDetail.Wrapper,
          path: "/backend/collection/:id",
          routes: [
            {
              name: "backendCollection",
              exact: true,
              component: Backend.CollectionDetail.General,
              path: "/backend/collection/:id",
              helper: r => `/backend/collection/${r}`
            },
            {
              name: "backendCollectionResources",
              exact: true,
              component: Backend.CollectionDetail.Resources,
              path: "/backend/collection/:id/resources",
              helper: r => `/backend/collection/${r}/resources`
            }
          ]
        },
        {
          exact: false,
          component: Backend.Settings.Wrapper,
          path: "/backend/settings",
          routes: [
            {
              name: "backendSettingsTheme",
              exact: true,
              component: Backend.Settings.Theme,
              path: "/backend/settings/theme",
              helper: () => "/backend/settings/theme"
            },
            {
              name: "backendSettingsIntegrations",
              exact: true,
              component: Backend.Settings.Integrations,
              path: "/backend/settings/integrations",
              helper: () => "/backend/settings/integrations"
            },
            {
              name: "backendSettingsEmail",
              exact: true,
              component: Backend.Settings.Email,
              path: "/backend/settings/email",
              helper: () => "/backend/settings/email"
            },
            {
              name: "backendSettings",
              exact: true,
              component: Backend.Settings.General,
              path: "/backend/settings",
              helper: () => "/backend/settings"
            }
          ]
        },
        {
          component: Frontend.NotFound
        }
      ]
    },
    {
      component: Frontend.Frontend,
      path: "/",
      routes: [
        {
          name: "frontendTest",
          exact: true,
          component: Frontend.Test,
          path: "/test",
          helper: () => `/test`
        },

        {
          name: "frontendProject",
          exact: true,
          component: Frontend.ProjectDetail,
          path: "/project/:id",
          helper: p => `/project/${p}`
        },
        {
          name: "frontendFollowing",
          exact: true,
          component: Frontend.Following,
          path: "/following",
          helper: () => "/following"
        },
        {
          name: "frontendFeatured",
          exact: true,
          component: Frontend.Featured,
          path: "/featured",
          helper: () => "/featured"
        },
        {
          exact: true,
          component: Frontend.PasswordReset,
          path: "/reset-password/:resetToken"
        },
        {
          name: "frontendProjectEvents",
          exact: true,
          component: Frontend.EventList,
          path: "/project/:id/events/:page?",
          helpers: {
            frontendProjectEvents: p => `/project/${p}/events`,
            frontendProjectEventsPage: (pr, pg) => `/project/${pr}/events/${pg}`
          }
        },
        {
          name: "frontendPage",
          exact: true,
          component: Frontend.Page,
          path: "/page/:slug",
          helper: p => `/page/${p}`
        },
        {
          name: "frontendProjectCollection",
          exact: true,
          component: Frontend.CollectionDetail,
          path: "/project/:id/collection/:collectionId",
          helper: (p, c) => `/project/${p}/collection/${c}`
        },
        {
          name: "frontendProjectResources",
          exact: true,
          component: Frontend.ProjectResources,
          path: "/project/:id/resources/:page?",
          helper: (p, pg = null) =>
            `/project/${p}/resources${pg ? `/${pg}` : ""}`
        },
        {
          name: "frontendProjectCollectionCollectionResource",
          exact: true,
          component: Frontend.CollectionResourceDetail,
          path:
            "/project/:id/collection/:collectionId/collection_resource/:collectionResourceId",
          helper: (p, c, cr) =>
            `/project/${p}/collection/${c}/collection_resource/${cr}`
        },
        {
          name: "frontendProjectResource",
          exact: true,
          component: Frontend.ResourceDetail,
          path: "/project/:id/resource/:resourceId",
          helpers: {
            frontendProjectResource: (p, r) => `/project/${p}/resource/${r}`,
            frontendProjectResourceRelative: r => `resource/${r}`
          }
        },
        {
          name: "frontend",
          exact: true,
          component: Frontend.Home,
          path: "/",
          helper: () => "/"
        },
        {
          component: Frontend.NotFound
        }
      ]
    },
    {
      component: Frontend.NotFound
    }
  ];
};
/* eslint-enable max-len */
