import React from "react";
import { mount } from "enzyme";

import AddCriteria from "./AddCriteria";

describe("<AddCriteria />", () => {
  it("should render without crashing", () => {
    mount(<AddCriteria />);
  });
});
