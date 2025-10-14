const URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function register(username, password, email) {
  const response = await fetch(`${URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed Register");
  return result;
}

export async function login(username, email, password) {
  const response = await fetch(`${URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed Login");
  return result;
}

export async function getUserProfile(token) {
  const response = await fetch(`${URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed Profile");
  return result;
}
