// lib/api.js
const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchArtikel(token) {
  const res = await fetch(`${API}/api/artikel`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

export async function tambahArtikel(data, token) {
  const res = await fetch(`${API}/api/artikel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data, // FormData
  });
  return await res.json();
}
