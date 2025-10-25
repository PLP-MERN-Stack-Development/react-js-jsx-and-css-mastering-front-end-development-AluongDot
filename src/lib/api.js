// src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || "https://wk-backend.onrender.com/api/tasks";

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const tasks = await response.json();
    console.log("✅ Tasks fetched:", tasks);
    return tasks;
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    return [];
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const newTask = await response.json();
    console.log("✅ Task created:", newTask);
    return newTask;
  } catch (err) {
    console.error("❌ Error creating task:", err);
    throw err;
  }
};

// Update a task
export const updateTask = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const updatedTask = await response.json();
    console.log("✅ Task updated:", updatedTask);
    return updatedTask;
  } catch (err) {
    console.error("❌ Error updating task:", err);
    throw err;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    console.log("✅ Task deleted:", result);
    return result;
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    throw err;
  }
};
