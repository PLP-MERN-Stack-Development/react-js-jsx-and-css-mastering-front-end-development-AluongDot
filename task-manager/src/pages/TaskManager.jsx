import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { getTasks, createTask, updateTask, deleteTask } from "../lib/api";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Load tasks from MongoDB
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("❌ Error loading tasks:", err);
      }
    };
    loadTasks();
  }, []);

  // ✅ Create new task
  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      const newTask = await createTask({ title, description });
      setTasks([newTask, ...tasks]);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert("Failed to create task");
    }
  };

  // ✅ Toggle task completion
  const handleToggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const updated = await updateTask(id, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("❌ Error toggling complete:", err);
    }
  };

  // ✅ Delete task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Error deleting task:", err);
    }
  };

  // ✅ Update task details
  const handleUpdateTask = async (id, updatedFields) => {
    try {
      const updated = await updateTask(id, updatedFields);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("❌ Error updating task:", err);
    }
  };

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <p className="text-gray-600 mb-6">
        {tasks.length > 0
          ? `${completed} of ${tasks.length} tasks completed`
          : "No tasks yet"}
      </p>

      <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">📝 Add New Task</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg mb-3"
          placeholder="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded-lg mb-3"
          placeholder="Description (optional)"
          rows="3"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          ➕ Add Task
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <Card
              key={task._id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
