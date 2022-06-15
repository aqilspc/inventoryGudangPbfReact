import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = (
) => {
  const token = JSON.parse(localStorage.getItem("token"))
  console.log(token)
  return token ? (
    <Navigate replace to={"/"} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;