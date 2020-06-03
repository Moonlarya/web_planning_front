import React from "react";
import { mount } from "enzyme";

import Report from "./Report";

describe("<Report />", () => {
  it("should render without crashing", () => {
    mount(<Report />);
  });
});
