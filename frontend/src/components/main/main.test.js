import React from "react";
import { shallow } from "enzyme";
import Main from "./main";

describe("Main", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });
});
