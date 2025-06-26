import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    if (pathname === "/") return;

    const header = document.querySelector("header");
    const headerHeight = header?.offsetHeight || 260;

    // Delay scroll to allow the page to load fully and prevent jumpy behavior
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({ top: headerHeight, behavior: "smooth" });
    }, 200);

    return () => clearTimeout(scrollTimeout); // Clean up if component unmounts early
  }, [pathname]);

  // Show button after scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-lg cursor-pointer"
        aria-label="Scroll to top"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <ArrowUp size={20} />
        </motion.div>
      </motion.button>
    )
  );
}
