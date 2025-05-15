import API_BASE from "./api";

export async function getTasks(userId) {
    const res = await fetch(`${API_BASE}/tasks?user_id=${userId}`);
    return res.json();
}

export async function createTask(task) {
    const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
}

export async function updateTask(id, task) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    return res.json();
}