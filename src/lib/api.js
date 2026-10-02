export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const STORAGE_URL = API_URL.replace(/\/api\/?$/, '/storage');

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Erreur ${res.status}`);
  }
  return res.json();
}

export async function apiPost(path, data) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Erreur ${res.status}`);
  }
  return res.json();
}
