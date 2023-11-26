import React from "react";
import { shallow } from "enzyme";
import RoomUpdate from "./roomUpdate";

describe("RoomUpdate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RoomUpdate />);
    expect(wrapper).toMatchSnapshot();
  });
});
