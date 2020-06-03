import React from "react";
import { mount } from "enzyme";

import Grades from "./Grades";

describe("<Grades />", () => {
  it("should render without crashing", () => {
    mount(<Grades />);
  });
});
