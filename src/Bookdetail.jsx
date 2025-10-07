import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Bookdetail({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getBookDetails() {
      try {
        const res = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
        );
        const data = await res.json();
        console.log(data);
        setBook(data);
      } catch (err) {
        setError("Failed to load details");
      } finally {
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  async function handleReserve() {
    if (!token) {
      setMessage("Log in to reserve a book.");
      return;
    }
    try {
      const res = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(" Book reserved!");
        setBook({ ...book, available: false });
      } else {
        setMessage(data.message || "Already reserved or unavailable.");
      }
    } catch (err) {
      setMessage("Error reserving book");
    }
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p> {error}</p>;
  if (!book) return <p> no book found.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>{book.title}</h1>
      <p>By {book.author}</p>
      <p>{book.description}</p>
      <p>
        <strong>Status:</strong> {book.available ? "Available" : "Unavailable"}
      </p>
      {book.available && (
        <button onClick={handleReserve}>Reserve this book</button>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}
