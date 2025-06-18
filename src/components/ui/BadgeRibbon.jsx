const badgeColorMap = {
  "15% off": {
    light: "bg-green-400 text-white",
    dark: "dark:bg-green-400 dark:text-black",
  },
  SALE: {
    light: "bg-red-400 text-white",
    dark: "dark:bg-red-400 dark:text-black",
  },
  NEW: {
    light: "bg-blue-400 text-white",
    dark: "dark:bg-blue-400 dark:text-black",
  },
  HOT: {
    light: "bg-orange-400 text-white",
    dark: "dark:bg-orange-400 dark:text-black",
  },
  TRENDING: {
    light: "bg-pink-400 text-white",
    dark: "dark:bg-pink-400 dark:text-black",
  },
  PREMIUM: {
    light: "bg-purple-400 text-white",
    dark: "dark:bg-purple-400 dark:text-black",
  },
  WINTER: {
    light: "bg-cyan-400 text-black",
    dark: "dark:bg-cyan-200 dark:text-black",
  },
  "SELF-CARE": {
    light: "bg-teal-400 text-black",
    dark: "dark:bg-teal-200 dark:text-black",
  },
  BESTSELLER: {
    light: "bg-yellow-400 text-black",
    dark: "dark:bg-yellow-200 dark:text-black",
  },
};


const BadgeRibbon = ({ badge, className = "" }) => {
  const baseStyle =
    "absolute text-center text-white text-xs sm:text-sm font-bold px-3 py-1 shadow-md z-10";
  if (!badge) return null;

  const classes =
    (badgeColorMap[badge]?.light || "bg-gray-400 text-white") +
    " " +
    (badgeColorMap[badge]?.dark || "dark:bg-gray-600 dark:text-white");

  return <div className={`${baseStyle} ${classes} ${className}`}>{badge}</div>;
};

export default BadgeRibbon;
