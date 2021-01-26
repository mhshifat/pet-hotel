import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../hooks";
import { IRoute } from "../pages";

const PublicRoute: React.FC<IRoute> = ({
  component: Component,
  ...restProps
}) => {
  const { isProcessing, isLoggedIn } = useAuth();

  if (isProcessing) return null;
  if (!isProcessing && isLoggedIn) return <Redirect to="/" />;
  return <Route {...restProps} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
