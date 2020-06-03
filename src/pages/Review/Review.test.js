import React from "react";
import { mount } from "enzyme";

import Review from "./Review";

describe("<Review />", () => {
  it("should render without crashing", () => {
    mount(<Review />);
  });
});
