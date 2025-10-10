import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App/AuthContext"; // swap to real one later

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/books");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: 16,
        padding: 12,
        borderBottom: "1px solid #eee",
      }}
    >
      <Link to="/books">Books</Link>

      {!isLoggedIn ? (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/account">Account</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
