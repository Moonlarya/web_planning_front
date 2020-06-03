import React from "react";
import { mount } from "enzyme";

import FinishedTasks from "./FinishedTasks";

describe("<FinishedTasks />", () => {
  it("should render without crashing", () => {
    mount(<FinishedTasks />);
  });
});
