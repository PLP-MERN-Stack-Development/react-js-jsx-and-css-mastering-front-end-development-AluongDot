import { useState, useEffect } from "react";

const Card = ({ task, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEditTitle(task.title);
    setEditDesc(task.description);
  }, [task]);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    try {
      setSaving(true);
      await onUpdate(task._id, { title: editTitle, description: editDesc });
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col gap-3 border-l-4 ${
      task.completed ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-blue-400'
    }`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter task title"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter task description"
            rows="3"
          />
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-white"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "💾 Save"}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-500 text-white"
              onClick={() => setIsEditing(false)}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <div className="flex-1">
              <h3 className={`font-bold text-xl mb-3 ${task.completed ? "line-through text-gray-500" : "text-gray-800 dark:text-white"}`}>
                📝 {task.title}
              </h3>
              <p className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>
                {task.description || "No description provided"}
              </p>
              {task.createdAt && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  📅 Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                task.completed 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              onClick={() => onToggleComplete(task._id)}
            >
              {task.completed ? "↩️ Undo" : "✅ Complete"}
            </button>
            <button
              className="px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>
            <button
              className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              onClick={() => onDelete(task._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
