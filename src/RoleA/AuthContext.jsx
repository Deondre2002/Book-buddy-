import { createContext, useState, useEffect, useContext } from "react";
import { register, login, getUserProfile } from "../authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const isLoggedIn = !!token;

  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then(setUser)
        .catch(() => logout());
    }
  }, [token]);

  async function userRegister(username, password, email) {
    try {
      await register(username, password, email);
      setError("");

      // Save for login
      localStorage.setItem("savedUsername", username);
      localStorage.setItem("savedPassword", password);
      localStorage.setItem("savedEmail", email);
    } catch (err) {
      console.error("userRegister error", err);
      setError("Registration failed. Try again.");
    }
  }

  async function userLogin(username, password) {
    try {
      const email = localStorage.getItem("savedEmail");
      if (!email) throw new Error("Email not found. Please register first.");

      const { token } = await login(username, email, password);
      setToken(token);
      localStorage.setItem("token", token);

      const userData = await getUserProfile(token);
      setUser(userData);
      setError("");
    } catch (err) {
      console.error("userLogin error", err);
      setError("Login failed. Check credentials.");
    }
  }

  function logout(navigate) {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    if (navigate) navigate("books");
  }

  return (
    <AuthContext.Provider
      value={{ token, user, error, isLoggedIn, userRegister, userLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside <AuthProvider>");
  return context;
}
