import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Bookdetail({ token }) {
  const { id } = useParams(); // get the :id from URL
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [reserving, setReserving] = useState(false);

  useEffect(() => {
    if (!id) {
      async function fetchBooks() {
        try {
          const res = await fetch(`${API}/books`);
          const data = await res.json();
          setBooks(data.books || []);
        } catch (err) {
          setError("Unable to load books");
        } finally {
          setLoading(false);
        }
      }
      fetchBooks();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      async function fetchBook() {
        try {
          const res = await fetch(`${API}/books/${id}`);
          const data = await res.json();
          setBook(data.book);
        } catch (err) {
          setError("Failed to load book details");
        } finally {
          setLoading(false);
        }
      }
      fetchBook();
    }
  }, [id]);

  async function handleReserve() {
    if (!token) {
      setMessage("Log in to reserve a book.");
      return;
    }

    setReserving(true);

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
        setMessage("Book reserved!");
        setBook({ ...book, available: false });
      } else {
        setMessage(data.message || "Already reserved or unavailable.");
      }
    } catch (err) {
      setMessage("Error reserving book");
    } finally {
      setReserving(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>No book found.</p>;

  if (!id) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>All Books</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((b) => (
              <li key={b.id} style={{ margin: "10px 0" }}>
                <Link to={`/books/${b.id}`}>
                  {b.title} by {b.author}
                </Link>
              </li>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>{book.title}</h1>
      <p>By {book.author}</p>
      <p>{book.description}</p>
      <p>
        <strong>Status:</strong> {book.available ? "Available" : "Unavailable"}
      </p>
      {book.available && (
        <button onClick={handleReserve} disabled={reserving}>
          {reserving ? "Reserving..." : "Reserve this book"}
        </button>
      )}
      {!token && <p>Please log in to reserve this book.</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
