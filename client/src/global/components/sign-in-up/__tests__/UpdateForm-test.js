import { UpdateFormContainer } from "../UpdateForm";

describe("global/components/sign-in-up/UpdateForm", () => {
  def("user", () => factory("user"));
  def("authentication", () => fixtures.authentication({ user: $user }));
  def("root", () => (
    <UpdateFormContainer
      dispatch={$dispatch}
      authentication={$authentication}
      mode="new"
      t={key => key}
    />
  ));

  it("matches the snapshot", () => {
    expect(render($withApp($root)).html()).toMatchSnapshot();
  });
});
