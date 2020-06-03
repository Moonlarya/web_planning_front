import React from "react";
import { mount } from "enzyme";

import Clients from "./Clients";

describe("<Clients />", () => {
  it("should render without crashing", () => {
    mount(<Clients />);
  });
});
