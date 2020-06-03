import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Project from "./Project";

describe("<Project />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <Project />
      </BrowserRouter>
    );
  });
});
