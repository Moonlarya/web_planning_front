import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Grades from "./Grades";

describe("<Grades />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <Grades />
      </BrowserRouter>
    );
  });
});
