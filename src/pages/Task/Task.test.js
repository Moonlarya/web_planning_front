import React from "react";
import { mount } from "enzyme";

import Task from "./Task";

describe("<Task />", () => {
  it("should render without crashing", () => {
    mount(<Task />);
  });
});
