import { ToastProvider } from "@mhshifat/mhs-ui";
import React from "react";
import AuthProvider from "./AuthProvider";
import StyleProviders from "./StyleProviders";

const Providers: React.FC = ({ children }) => {
  return (
    <StyleProviders>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </StyleProviders>
  );
};

export default Providers;
