import React from "react";
import { shallow } from "enzyme";
import Gmail from "./gmail";

describe("Gmail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Gmail />);
    expect(wrapper).toMatchSnapshot();
  });
});
