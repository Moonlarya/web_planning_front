import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DashboardRoute from "./DashboardRoute";

import { Home, Task } from "../pages";

const RouteSchema = () => (
  <Router>
    <Switch>
      <DashboardRoute exact path="/" component={Home} />
      <DashboardRoute exact path="/task" component={Task} />

      <Route exact component={() => <h1 className="text-center"> 404 </h1>} />
    </Switch>
  </Router>
);

export default RouteSchema;
