// src/components/DarkModeToggle.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import sunIcon from "/src/icons/sun.png";
import moonIcon from "/src/icons/moon.png";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(
    () =>
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-400 flex items-center px-1 relative transition-colors cursor-pointer"
    >
      {/* Sliding circle with PNG icon */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full bg-white dark:bg-black dark:text-white flex items-center justify-center shadow-md overflow-hidden"
        style={{ marginLeft: isDark ? "1.5rem" : "0rem" }}
      >
        <img
          src={isDark ? moonIcon : sunIcon}
          alt={isDark ? "Moon icon" : "Sun icon"}
          className="w-4 h-4"
        />
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
