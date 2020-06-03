import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Clients from "./Clients";

describe("<Clients />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <Clients />
      </BrowserRouter>
    );
  });
});
