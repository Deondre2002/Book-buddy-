import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Api = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Bookdetail({ token }) {
  const { id } = useParams();
  const isListView = !id;
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [reserving, setReserving] = useState(false);

  console.log("Params ID:", id);
  console.log("Is list view:", isListView);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let response, data;

        if (isListView) {
          response = await fetch(`${Api}/books`);
          data = await response.json();
          console.log("Fetched books:", data);
          setBooks(Array.isArray(data) ? data : data.books || []);
        } else {
          response = await fetch(`${Api}/books/${id}`);
          data = await response.json();
          console.log("Fetched book:", data);
          setBook(data.book || data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, isListView]);

  async function handleReserve() {
    if (!token) {
      setMessage("Log in to reserve a book.");
      return;
    }

    setReserving(true);

    try {
      const res = await fetch(`${Api}/reservations`, {
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

  if (isListView) {
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

  if (!book) return <p>No book found.</p>;

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
