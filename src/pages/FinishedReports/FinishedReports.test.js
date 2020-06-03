import React from "react";
import { mount } from "enzyme";

import FinishedReports from "./FinishedReports";

describe("<FinishedReports />", () => {
  it("should render without crashing", () => {
    mount(<FinishedReports />);
  });
});
