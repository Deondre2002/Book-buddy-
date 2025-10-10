import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BooksPage from "../Pages/BooksPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import AccountPage from "../Pages/AccountPage";
import NotFoundPage from "../Pages/NotFoundPage";

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
