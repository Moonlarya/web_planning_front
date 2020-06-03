import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Task from "./Task";

describe("<Task />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <Task />
      </BrowserRouter>
    );
  });
});
