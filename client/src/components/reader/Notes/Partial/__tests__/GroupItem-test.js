import React from "react";
import renderer from "react-test-renderer";
import GroupItem from "../GroupItem";
import build from "test/fixtures/build";

describe("Reader.Notes.Partial.GroupItem Component", () => {
  const annotation = build.entity.annotation("1");

  const component = renderer.create(<GroupItem annotation={annotation} />);

  it("renders correctly", () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't render to null", () => {
    let tree = component.toJSON();
    expect(tree).not.toBe(null);
  });
});
