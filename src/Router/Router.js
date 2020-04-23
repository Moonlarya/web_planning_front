import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DashboardRoute from "./DashboardRoute";

import {
  Home,
  Task,
  Report,
  Payout,
  Balance,
  Review,
  Clients,
  Project,
  AddClient,
  AddTask,
  AddProject,
  AddReview,
  AddReport,
} from "../pages";

const RouteSchema = () => (
  <Router>
    <Switch>
      <DashboardRoute exact path="/" component={Home} />
      <DashboardRoute exact path="/task" component={Task} />
      <DashboardRoute exact path="/report" component={Report} />
      <DashboardRoute exact path="/balance" component={Balance} />
      <DashboardRoute exact path="/payout" component={Payout} />
      <DashboardRoute exact path="/review" component={Review} />
      <DashboardRoute exact path="/clients" component={Clients} />
      <DashboardRoute exact path="/projects" component={Project} />
      <DashboardRoute exact path="/addclient" component={AddClient} />
      <DashboardRoute exact path="/addtask" component={AddTask} />
      <DashboardRoute exact path="/addproject" component={AddProject} />
      <DashboardRoute exact path="/addreview" component={AddReview} />
      <DashboardRoute exact path="/addreport" component={AddReport} />

      <Route exact component={() => <h1 className="text-center"> 404 </h1>} />
    </Switch>
  </Router>
);

export default RouteSchema;
