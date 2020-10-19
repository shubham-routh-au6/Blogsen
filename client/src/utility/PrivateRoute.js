import React from "react";
import decode from "jwt-decode";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    decode(token);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
