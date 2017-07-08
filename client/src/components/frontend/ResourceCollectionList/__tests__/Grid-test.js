import React from "react";
import renderer from "react-test-renderer";
import Grid from "../Grid";
import build from "test/fixtures/build";
import { wrapWithRouter } from "test/helpers/routing";

describe("Frontend.ResourceCollectionList.Grid component", () => {
  const collections = [
    build.entity.collection("1"),
    build.entity.collection("2")
  ];

  it("renders correctly", () => {
    const component = renderer.create(
      wrapWithRouter(<Grid resourceCollections={collections} projectId="1" />)
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
