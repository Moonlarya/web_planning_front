import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import FinishedTasks from "./FinishedTasks";

describe("<FinishedTasks />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <FinishedTasks />
      </BrowserRouter>
    );
  });
});
