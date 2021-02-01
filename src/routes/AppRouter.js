import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Login from "../views/Login";
import Jobs from "../views/Jobs";
import FormJobs from "../views/UpdateJob";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/jobs" component={Jobs} />
        <PrivateRoute exact path="/jobs/:id" component={FormJobs} />
      </Switch>
    </Router>
  );
}
