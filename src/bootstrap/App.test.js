import React from "react";
import { mount } from "enzyme";

import App from "./index";

describe("Application", () => {
  it("should mount without crashing", () => {
    mount(<App />);
  });
});
