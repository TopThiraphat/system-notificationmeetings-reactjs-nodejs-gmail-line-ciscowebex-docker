import React from "react";
import { shallow } from "enzyme";
import RoomCreate from "./roomCreate";

describe("RoomCreate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RoomCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
