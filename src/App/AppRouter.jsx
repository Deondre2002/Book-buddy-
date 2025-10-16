import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import BooksPage from "../Pages/BooksPage.jsx";
import LoginPage from "../Pages/LoginPage.jsx";
import RegisterPage from "../Pages/RegisterPage.jsx";
import AccountPage from "../Pages/AccountPage.jsx";
import NotFoundPage from "../Pages/NotFoundPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
