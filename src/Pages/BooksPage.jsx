import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | done
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus("loading");

    // 🧠 temporary fake book list (mock data)
    setTimeout(() => {
      const fakeBooks = [
        { id: 1, title: "Dune", author: "Frank Herbert", available: true },
        {
          id: 2,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          available: false,
        },
        { id: 3, title: "1984", author: "George Orwell", available: true },
      ];
      setBooks(fakeBooks);
      setStatus("done");
    }, 800);
  }, []);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error") return <p>Oops: {error}</p>;
  if (status === "done" && books.length === 0) return <p>No books yet.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Books</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {books.map((b) => (
          <Link
            key={b.id}
            to={`/books/${b.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ border: "5px solid #9c3a3aff", padding: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {b.coverUrl ? (
                  <img src={b.coverUrl} alt={b.title} width="60" />
                ) : null}
                <div>
                  <div style={{ fontWeight: 700 }}>{b.title}</div>
                  <div>{b.author}</div>
                  <div>{b.available ? "Available 👍🏿" : "Unavailable 👎🏿"}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
