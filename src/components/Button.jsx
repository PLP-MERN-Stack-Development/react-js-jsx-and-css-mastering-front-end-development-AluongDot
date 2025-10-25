const Button = ({ variant = 'primary', children, onClick }) => {
  const base = "px-4 py-2 rounded font-semibold transition-all";
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button
      className={`${base} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
