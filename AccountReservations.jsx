import { useEffect, useState } from "react";

const Api = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function AccountReservation({ token }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch(`${Api}/reservations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setReservations(data.reservations || []);
        } else {
          setError(data.message || "Failed to load reservations");
        }
      } catch (err) {
        setError("Unable to load reservations");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchReservations();
    } else {
      setMessage("Please log in to view your reservations.");
      setLoading(false);
    }
  }, [token]);

  async function handleReturn(reservationId) {
    try {
      const res = await fetch(`${Api}/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setReservations(reservations.filter((r) => r.id !== reservationId));
        setMessage("Book returned successfully!");
      } else {
        setMessage(data.message || "Failed to return the book.");
      }
    } catch (err) {
      setMessage("Error returning book");
    }
  }

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>My Reservations</h1>

      {message && <p>{message}</p>}

      {reservations.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reservations.map((res) => (
            <li key={res.id} style={{ margin: "15px 0" }}>
              <strong>{res.book.title}</strong> by {res.book.author}
              <br />
              <button
                onClick={() => handleReturn(res.id)}
                style={{ marginTop: "8px" }}
              >
                Return Book
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No current reservations.</p>
      )}
    </div>
  );
}
