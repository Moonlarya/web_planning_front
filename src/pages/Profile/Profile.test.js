import React from "react";
import { mount } from "enzyme";

import Profile from "./Profile";

describe("<Profile />", () => {
  it("should render without crashing", () => {
    mount(<Profile />);
  });
});
