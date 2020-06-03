import React from "react";
import { mount } from "enzyme";

import Employees from "./Employees";

describe("<Employees />", () => {
  it("should render without crashing", () => {
    mount(<Employees />);
  });
});
