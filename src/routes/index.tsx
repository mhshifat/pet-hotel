import { useToaster } from "@mhshifat/mhs-ui";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/index";
import { setAccessToken } from "../helpers/localStorage";
import { useAuth } from "../hooks";
import routes from "../pages";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Routes: React.FC = () => {
  const { toaster } = useToaster();
  const { post, loading } = useFetch(API_BASE_URL);
  const { setIsProcessing, setAuthState } = useAuth();

  useEffect(() => {
    post(API_ENDPOINTS.AUTH.TOKEN_LOGIN, {
      token: localStorage?.tid || "",
    }).then((res) => {
      if (!res.success && !res.error.messages)
        toaster.error("Invalid token, please log in again");
      if (res.success) {
        setAuthState(res.data.user);
        setAccessToken(res.data.token);
      }
      setIsProcessing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? null : (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          {routes.map((route) =>
            route.routeType === "private" ? (
              <PrivateRoute key={route.name} {...route} />
            ) : route.routeType === "public" ? (
              <PublicRoute key={route.name} {...route} />
            ) : (
              <Route key={route.name} {...route} />
            )
          )}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
