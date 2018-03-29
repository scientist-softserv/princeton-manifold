import React from "react";
import renderer from "react-test-renderer";
import Annotate from "../Annotate";
import build from "test/fixtures/build";
import { Provider } from "react-redux";

describe("Reader.Annotation.Popup.Menu.Annotate Component", () => {
  const store = build.store();
  const text = build.entity.text("1");

  it("renders correctly when not logged in", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Annotate
          destroySelected={() => {}}
          attachNotation={() => {}}
          highlight={() => {}}
          annotate={() => {}}
          bookmark={() => {}}
          showShare={() => {}}
          showLogin={() => {}}
          text={text}
        />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
