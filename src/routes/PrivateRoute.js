import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
