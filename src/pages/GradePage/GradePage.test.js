import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import GradePage from "./GradePage";

describe("<GradePage />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <GradePage />
      </BrowserRouter>
    );
  });
});
