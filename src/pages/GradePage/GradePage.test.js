import React from "react";
import { mount } from "enzyme";

import GradePage from "./GradePage";

describe("<GradePage />", () => {
  it("should render without crashing", () => {
    mount(<GradePage />);
  });
});
