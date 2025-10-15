import { useState } from "react";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Return({ token, reservationId, onReturn }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReturn() {
    if (!token) {
      setError("Please log in to return book!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Couldn't return book");
      }

      onReturn(reservationId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleReturn} disabled={loading}>
        {loading ? "Returning..." : "Return Book"}
      </button>
    </div>
  );
}
