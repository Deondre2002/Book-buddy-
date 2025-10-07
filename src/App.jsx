import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookdetail from "./Bookdetail";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="center">
              <h1>Welcome to Book Buddy!</h1>
            </div>
          }
        />
        <Route path="/books/:id" element={<Bookdetail />} />
      </Routes>
    </BrowserRouter>
  );
}
