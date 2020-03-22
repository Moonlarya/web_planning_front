import React from "react";
import { Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const DashboardRoute = props => (
  <div className="App d-flex">
    <Sidebar />

    <main className="col-10">
      <Route {...props} />
    </main>
  </div>
);

export default DashboardRoute;
