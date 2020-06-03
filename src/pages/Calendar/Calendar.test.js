import React from "react";
import { mount } from "enzyme";

import Calendar from "./Calendar";

describe("<Calendar />", () => {
  it("should render without crashing", () => {
    mount(<Calendar />);
  });
});
