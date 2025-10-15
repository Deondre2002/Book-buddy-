import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export function Login({ navigate }) {
  const { userLogin, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername") || "";
    const savedPassword = localStorage.getItem("savedPassword") || "";
    setUsername(savedUsername);
    setPassword(savedPassword);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await userLogin(username, password);
    navigate("account");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
