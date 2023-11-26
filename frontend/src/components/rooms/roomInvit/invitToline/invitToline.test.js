import React from "react";
import { shallow } from "enzyme";
import InvitToline from "./invitToline";

describe("InvitToline", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InvitToline />);
    expect(wrapper).toMatchSnapshot();
  });
});
