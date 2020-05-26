import React from "react";
import { Route, Redirect } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import { withAuth } from "../stores/User";

const DashboardRoute = (props) => {
  if (!props.user) return <Redirect to="/" />;

  return (
    <div className="App d-flex">
      <Sidebar />

      <main className="col-10">
        <Route {...props} />
      </main>
    </div>
  );
};

export default withAuth(DashboardRoute);
