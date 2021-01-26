import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error('Wrap your root component with "AuthProvider"');
  return authContext;
};

export default useAuth;
