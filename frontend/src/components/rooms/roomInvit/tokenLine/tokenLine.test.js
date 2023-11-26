import React from "react";
import { shallow } from "enzyme";
import TokenLine from "./tokenLine";

describe("TokenLine", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TokenLine />);
    expect(wrapper).toMatchSnapshot();
  });
});
