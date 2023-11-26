import React from "react";
import { shallow } from "enzyme";
import InvitToGmail from "./invitToGmail";

describe("InvitToGmail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InvitToGmail />);
    expect(wrapper).toMatchSnapshot();
  });
});
