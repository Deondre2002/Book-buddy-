import { useState } from "react";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Reserve({ token, bookid, onReserve }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useStae("");
  const [message, setMessage] = useState("");

  async function handleReserve() {
    if (!token) {
      setError("Login in to reserve a book!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Book successfully reserved!");
        onReserve?.(bookId);
      } else {
        setError(data.message || " Book reserved or unavailable");
      }
    } catch (err) {
      setError("error reserving book");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button onClick={handleReserve} disabled={loading}>
        {loading ? "Rerseving..." : "Reserve Book"}
      </button>
    </div>
  );
}
