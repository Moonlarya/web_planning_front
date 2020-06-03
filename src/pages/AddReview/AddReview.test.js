import React from "react";
import { mount } from "enzyme";

import AddReview from "./AddReview";

describe("<AddReview. />", () => {
  it("should render without crashing", () => {
    mount(<AddReview />);
  });
});
