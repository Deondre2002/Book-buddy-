import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./App/AppRouter";
import { AuthProviderStub } from "./App/AuthContext"; // or "./App/AuthContextStub" if that’s your file name
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./RoleA/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderStub>
      <AppRouter />
    </AuthProviderStub>
  </React.StrictMode>
);