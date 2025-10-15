import { useAuth } from "./AuthContext";

export function Account({ navigate }) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2>Account Page</h2>
      <p>Username: {user.username}</p>
      <p>Email: {localStorage.getItem("savedEmail")}</p>
      <p>Reservations: (placeholder)</p>
      <button onClick={() => logout(navigate)}>Logout</button>
    </div>
  );
}
