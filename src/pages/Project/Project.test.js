import React from "react";
import { mount } from "enzyme";

import Project from "./Project";

describe("<Project />", () => {
  it("should render without crashing", () => {
    mount(<Project />);
  });
});
