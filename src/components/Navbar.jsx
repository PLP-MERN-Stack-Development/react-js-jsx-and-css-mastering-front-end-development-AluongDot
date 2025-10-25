
import { Link } from "react-router-dom";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 border-b">
      <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600">
        TaskManager
      </Link>
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-3 py-2 rounded"
        >
          Home
        </Link>
        <Link 
          to="/tasks" 
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-3 py-2 rounded"
        >
          Tasks
        </Link>
        <Button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;