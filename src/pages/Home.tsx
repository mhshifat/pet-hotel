import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks";

const Home = () => {
  const { authState } = useAuth();
  return authState.role === "pet_owner" ? (
    <Redirect to="/pets" />
  ) : (
    <Redirect to="/users" />
  );
};

export default Home;
