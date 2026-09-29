// Base URL of the REST API. json-server (see db.json + `npm run server`)
// serves this locally on port 5000. Point this at a real Spring Boot
// backend later just by changing this one value (or the VITE_API_URL env var).
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Thin wrapper around fetch() shared by every resource API.
 * Centralizes headers, JSON parsing, and error handling.
 */
export async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
  } catch (networkError) {
    throw new Error(
      `Could not reach the API at ${BASE_URL}. Is the server running? (npm run server)`
    );
  }

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  if (res.status === 204) return null;

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
