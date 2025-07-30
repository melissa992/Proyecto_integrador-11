const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function saveUserProgress(data) {
  const res = await fetch(`${API_URL}/progress`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function getLeaderboard() {
  const res = await fetch(`${API_URL}/leaderboard`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
