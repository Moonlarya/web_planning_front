import React from "react";
import { mount } from "enzyme";

import Payout from "./Payout";

describe("<Payout />", () => {
  it("should render without crashing", () => {
    mount(<Payout />);
  });
});
