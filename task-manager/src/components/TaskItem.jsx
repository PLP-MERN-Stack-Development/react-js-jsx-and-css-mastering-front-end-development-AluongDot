const TaskItem = ({ task, toggleComplete, deleteTask }) => (
  <div className="flex justify-between items-center p-2 border-b border-gray-300 dark:border-gray-700">
    <span className={task.completed ? 'line-through text-gray-400' : ''}>
      {task.text}
    </span>
    <div>
      <button
        className="mr-2 text-green-500"
        onClick={() => toggleComplete(task.id)}
      >
        ✔
      </button>
      <button className="text-red-500" onClick={() => deleteTask(task.id)}>✖</button>
    </div>
  </div>
);

export default TaskItem;