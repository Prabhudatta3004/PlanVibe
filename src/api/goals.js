import API_BASE from "./api";

export async function getGoals(userId) {
    const res = await fetch(`${API_BASE}/goals?user_id=${userId}`);
    return res.json();
}

export async function createGoal(goal) {
    const res = await fetch(`${API_BASE}/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
    });
    return res.json();
}

export async function updateGoal(id, goal) {
    const res = await fetch(`${API_BASE}/goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
    });
    return res.json();
}

export async function deleteGoal(id) {
    const res = await fetch(`${API_BASE}/goals/${id}`, { method: "DELETE" });
    return res.json();
}