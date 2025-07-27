import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";

export function Input({
  label,
  value,
  onChange,
  name,
  type = "text",
  required = false,
  className = "",
  onBlur,
  onFocus,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const isFloating = isFocused || (value && value.length > 0);
  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <motion.label
        htmlFor={name}
        initial={{
          top: "0.75rem",
          left: "1rem",
          fontSize: "1rem",
          scale: 1,
          color: "#A9A9A9",
          padding: "0",
        }}
        animate={{
          top: isFloating ? "-0.75rem" : "0.75rem",
          left: "1rem",
          fontSize: isFloating ? "0.875rem" : "1rem",
          scale: isFloating ? 0.95 : 1,
          color: isFloating ? "#ec4899" : "#A9A9A9",
          padding: isFloating ? "0 0.25rem" : "0",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bg-white dark:bg-gray-800 px-1 pointer-events-none z-10"
      >
        {label}
      </motion.label>

      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={isPassword && showPassword ? "text" : type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        className={`border border-gray-300 dark:border-gray-600 dark:text-white bg-white dark:bg-gray-800 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-500 ${
          isPassword ? "pr-10" : ""
        } ${className}`}
        {...props}
      />

      {/* Eye Toggle Button */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 z-20 cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
