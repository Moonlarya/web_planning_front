import React from "react";
import { mount } from "enzyme";

import AddProject from "./AddProject";

describe("<AddProject />", () => {
  it("should render without crashing", () => {
    mount(<AddProject />);
  });
});
