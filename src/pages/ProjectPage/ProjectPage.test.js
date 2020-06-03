import React from "react";
import { mount } from "enzyme";

import ProjectPage from "./ProjectPage";

describe("<ProjectPage />", () => {
  it("should render without crashing", () => {
    mount(<ProjectPage />);
  });
});
