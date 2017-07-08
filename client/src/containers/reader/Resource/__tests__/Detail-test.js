import React from "react";
import renderer from "react-test-renderer";
import { ResourceDetailContainer } from "../Detail";
import { Provider } from "react-redux";
import build from "test/fixtures/build";
import { wrapWithRouter } from "test/helpers/routing";

describe("Reader Resource Detail Container", () => {
  const store = build.store();
  const resource = build.entity.resource("1");
  resource.relationships.project = build.entity.project("2");
  const resourceMeta = {
    pagination: build.pagination()
  };
  const props = {
    resource,
    resourceMeta,
    history: {},
    match: {
      params: {
        textId: "2",
        sectionId: "3"
      }
    }
  };

  const component = renderer.create(
    wrapWithRouter(
      <Provider store={store}>
        <ResourceDetailContainer {...props} />
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
