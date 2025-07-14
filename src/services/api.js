const BASE_URL = 'http://localhost:3001';

export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error('API error');
  return res.json();
} 