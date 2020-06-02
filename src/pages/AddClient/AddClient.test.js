import React from "react";
import { mount } from "enzyme";

import AddClient from "./AddClient";

describe("<AddClient />", () => {
  it("should render without crashing", () => {
    mount(<AddClient />);
  });
});
