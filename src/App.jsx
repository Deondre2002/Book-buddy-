import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Bookdetail from "./Bookdetail";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/">Home</Link> | <Link to="/books">Books</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <h1 style={{ textAlign: "center" }}>Welcome to Book Buddy!</h1>
          }
        />

        <Route path="/books" element={<Bookdetail />} />

        <Route path="/books/:id" element={<Bookdetail />} />
      </Routes>
    </BrowserRouter>
  );
}
