import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../hooks";
import { IRoute } from "../pages";

const PrivateRoute: React.FC<IRoute> = ({
  component: Component,
  ...restProps
}) => {
  const { isProcessing, isLoggedIn, authState } = useAuth();

  if (isProcessing) return null;
  if (!isProcessing && !isLoggedIn) return <Redirect to="/login" />;
  if (
    !isProcessing &&
    isLoggedIn &&
    authState.role &&
    !restProps.canAccess.includes(authState.role)
  )
    return <Redirect to="/" />;
  return <Route {...restProps} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
