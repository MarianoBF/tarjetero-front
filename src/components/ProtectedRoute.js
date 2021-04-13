import React from "react";
import {Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";

function ProtectedRoute(props) {
  const Component = props.component;
  const autorizado = sessionStorage.getItem("JWT")
    ? jwt_decode(JSON.parse(sessionStorage.getItem("JWT"))).exp >
      new Date().getTime() / 1000
    : false;

  return autorizado ? <Component /> : <Redirect to={{pathname: "/login"}} />;
}

export default ProtectedRoute;
