import { useState } from "react";
import { Register } from "./RoleA/Register";
import { Login } from "./RoleA/Login.jsx";
import { Account } from "./RoleA/Account";
import { useAuth } from "./RoleA/AuthContext";

export default function App() {
  const [page, setPage] = useState("login");
  const { user } = useAuth();

  const navigate = (to) => setPage(to);

  // If token exists, show account page
  if (user) return <Account navigate={navigate} />;

  return (
    <div>
      <nav>
        <button onClick={() => navigate("login")}>Login</button>
        <button onClick={() => navigate("register")}>Register</button>
      </nav>
      <main>
        {page === "login" && <Login navigate={navigate} />}
        {page === "register" && <Register navigate={navigate} />}
      </main>
    </div>
  );
}

