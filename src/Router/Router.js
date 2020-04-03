import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DashboardRoute from "./DashboardRoute";

import { Home, Task, Report, Payout, Balance, Resume } from "../pages";

const RouteSchema = () => (
  <Router>
    <Switch>
      <DashboardRoute exact path="/" component={Home} />
      <DashboardRoute exact path="/task" component={Task} />
      <DashboardRoute exact path="/report" component={Report} />
      <DashboardRoute exact path="/balance" component={Balance} />
      <DashboardRoute exact path="/payout" component={Payout} />
      <DashboardRoute exact path="/resume" component={Resume} />

      <Route exact component={() => <h1 className="text-center"> 404 </h1>} />
    </Switch>
  </Router>
);

export default RouteSchema;
