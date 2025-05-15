const API_BASE = "http://localhost:8080";

export async function register({ username, email, password }) {
    const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    return res.json();
}

export async function login({ email, password }) {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
} 