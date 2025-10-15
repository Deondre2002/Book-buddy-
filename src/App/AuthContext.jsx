import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProviderStub({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    isLoggedIn,
    user: isLoggedIn ? { name: "Devan" } : null,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
