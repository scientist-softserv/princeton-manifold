import React from "react";
import renderer from "react-test-renderer";
import { ProjectEventsContainer } from "../";
import { Provider } from "react-redux";
import build from "test/fixtures/build";
import { wrapWithRouter } from "test/helpers/routing";
import BackLink from "frontend/components/back-link";
import { FrontendModeContext } from "helpers/contexts";

describe("Frontend EventList Container", () => {
  const pagination = build.pagination();
  const store = build.store();

  const project = build.entity.project("1");
  const events = [build.entity.event("2"), build.entity.event("3")];
  project.relationships.events = events;
  const meta = {
    pagination
  };

  const component = renderer.create(
    wrapWithRouter(
      <Provider store={store}>
        <BackLink.Provider>
          <FrontendModeContext.Provider
            value={{ isLibrary: true, isStandalone: false }}
          >
            <ProjectEventsContainer
              dispatch={store.dispatch}
              project={project}
              events={events}
              meta={meta}
            />
          </FrontendModeContext.Provider>
        </BackLink.Provider>
      </Provider>
    )
  );

  it("renders correctly", () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't render to null", () => {
    let tree = component.toJSON();
    expect(tree).not.toBe(null);
  });
});
