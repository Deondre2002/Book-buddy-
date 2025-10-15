import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./App/AppRouter.jsx";
import { AuthProviderStub } from "./App/AuthContext.jsx"; // 👈 notice: Stub, not Provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderStub>
      <AppRouter />
    </AuthProviderStub>
  </React.StrictMode>
);
