import React, { createContext, useEffect, useState } from "react";

interface UserPayload {
  uid: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  authState: Partial<UserPayload>;
  setAuthState: React.Dispatch<React.SetStateAction<Partial<UserPayload>>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [authState, setAuthState] = useState<Partial<UserPayload>>({});

  useEffect(() => {
    if (authState.uid) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isProcessing,
        setIsProcessing,
        authState,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
