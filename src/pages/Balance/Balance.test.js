import React from "react";
import { mount } from "enzyme";

import Balance from "./Balance";

describe("<Balance />", () => {
  it("should render without crashing", () => {
    mount(<Balance />);
  });
});
