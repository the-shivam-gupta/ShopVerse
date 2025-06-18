import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const baseStyle =
    "relative rounded-md px-8 py-2 font-semibold transition text-black dark:text-white cursor-pointer";

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
      <span className="relative flex items-center justify-center gap-2">
        {/* Animate text to slightly move left */}
        <motion.span
          variants={{
            initial: { x: 0 },
            hover: { x: -6 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.span>

        {/* Animate arrow to move right and appear */}
        <motion.span
          variants={{
            initial: { x: 0, opacity: 0 },
            hover: { x: 8, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ArrowRight size={18} />
        </motion.span>
      </span>
    </motion.button>
  );
}
