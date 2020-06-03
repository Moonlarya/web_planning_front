import React from "react";
import { mount } from "enzyme";

import SignIn from "./SignIn";

describe("<SignIn />", () => {
  it("should render without crashing", () => {
    mount(<SignIn />);
  });
});
