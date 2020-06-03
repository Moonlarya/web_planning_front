import React from "react";
import { mount } from "enzyme";

import AddTask from "./AddTask";

describe("<AddTask />", () => {
  it("should render without crashing", () => {
    mount(<AddTask />);
  });
});
