import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Bookdetail from "./Bookdetail";
import AccountReservation from "./AccountReservations";
import Portrait from "./Portrait";

export default function App() {
  const token = "";

  return (
    <BrowserRouter>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/">Home</Link> | <Link to="/books">Books</Link> |{" "}
        <Link to="/account">My Account</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div style={{ textAlign: "center" }}>
              <h1>Welcome to Book Buddy!</h1>
              <Portrait />
            </div>
          }
        />

        <Route path="/account" element={<AccountReservation token={token} />} />

        <Route path="/books" element={<Bookdetail token={token} />} />
        <Route path="/books/:id" element={<Bookdetail token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}
