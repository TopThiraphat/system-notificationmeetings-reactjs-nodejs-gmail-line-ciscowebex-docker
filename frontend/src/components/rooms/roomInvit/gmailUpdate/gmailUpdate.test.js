import React from "react";
import { shallow } from "enzyme";
import GmailUpdate from "./gmailUpdate";

describe("GmailUpdate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<GmailUpdate />);
    expect(wrapper).toMatchSnapshot();
  });
});
