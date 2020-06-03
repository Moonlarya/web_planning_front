import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Review from "./Review";

describe("<Review />", () => {
  it("should render without crashing", () => {
    shallow(
      <BrowserRouter>
        <Review />
      </BrowserRouter>
    );
  });
});
