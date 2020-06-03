import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import ProjectPage from "./ProjectPage";

describe("<ProjectPage />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <ProjectPage />
      </BrowserRouter>
    );
  });
});
