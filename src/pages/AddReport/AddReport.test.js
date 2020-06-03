import React from "react";
import { mount } from "enzyme";

import AddReport from "./AddReport";

describe("<AddProject />", () => {
  it("should render without crashing", () => {
    mount(<AddReport />);
  });
});
