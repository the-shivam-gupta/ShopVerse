import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const baseStyle =
    "relative flex items-center justify-center rounded-md px-8 py-2 font-semibold transition text-black dark:text-white bg-pink-500 hover:bg-pink-400 cursor-pointer";

  const variants = {
    link: "text-pink-500 hover:underline bg-transparent p-0",
  };

  return (
    <motion.button
      whileHover="hover"
      initial="initial"
      animate="initial"
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative flex items-center justify-center w-full">
        {children}
        <motion.span
          className="absolute -right-3 top-1/2 -translate-y-1/2"
          variants={{
            initial: { x: 0, opacity: 0 },
            hover: { x: 10, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ArrowRight size={18} />
        </motion.span>
      </span>
    </motion.button>
  );
}
