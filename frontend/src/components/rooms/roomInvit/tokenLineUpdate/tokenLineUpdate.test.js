import React from "react";
import { shallow } from "enzyme";
import TokenLineUpdate from "./tokenLineUpdate";

describe("TokenLineUpdate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TokenLineUpdate />);
    expect(wrapper).toMatchSnapshot();
  });
});
