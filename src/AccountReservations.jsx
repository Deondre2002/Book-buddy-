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
        const res = await fetch(`${Api}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setReservations(data.reservations || []);
      } catch (err) {
        setError("Couldn't load reservations at this time.");
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchReservations();
  }, [token]);

  async function handleReturn(id) {
    try {
      const res = await fetch(`${Api}/reservations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setMessage("Book returned");
        setReservations(reservations.filter((r) => r.id !== id));
      } else {
        setMessage("Error returning book.");
      }
    } catch (err) {
      setMessage("Network error while returning book.");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>My Reservations</h1>
      {reservations.length === 0 ? (
        <p>You have no books reserved at the moment</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reservations.map((r) => (
            <li key={r.id} style={{ margin: "10px 0" }}>
              <strong>{r.book.title}</strong> by {r.book.author}
              <div>
                <button onClick={() => handleReturn(r.id)}>return</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}
