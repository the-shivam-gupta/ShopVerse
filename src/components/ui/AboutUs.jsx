import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full dark:bg-black bg-gray-100">
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 sm:space-y-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-pink-400"
          variants={childVariants}
        >
          About Us
        </motion.h1>

        {/* Intro */}
        <motion.p
          className="text-base sm:text-lg text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          variants={childVariants}
        >
          Welcome to{" "}
          <span
            onClick={() => navigate("/")}
            className="font-semibold text-pink-500 cursor-pointer hover:underline"
          >
            ShopVerse
          </span>{" "}
          — your destination for the latest trends in bags, shoes, and clothing.
          Only store for premium fashion essentials for every style and
          occasion.
        </motion.p>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-10">
          {[
            {
              title: "Our Story",
              content:
                "ShopVerse started in 2025 with one goal — to make trendy fashion easy and affordable for everyone. We choose stylish bags, shoes, and jewelry that help you feel confident and express your style.",
            },
            {
              title: "Our Mission",
              content:
                "We aim to empower individuals through fashion by offering carefully selected items that blend comfort, quality, and style — all while supporting sustainable brands and artisans.",
            },
            {
              title: "Our Values",
              content: (
                <ul className="list-disc list-inside space-y-1">
                  <li>You always come first</li>
                  <li>Style with care for the planet</li>
                  <li>We choose quality, not quantity</li>
                  <li>We welcome all styles, backgrounds, and people</li>
                </ul>
              ),
            },
          ].map(({ title, content }, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 sm:p-6 border border-gray-100 dark:border-gray-500 dark:shadow-gray-600"
              variants={childVariants}
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-pink-500">
                {title}
              </h2>
              <div className="text-gray-500 dark:text-gray-200 text-base sm:text-lg">
                {content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
          variants={childVariants}
        >
          {["Bags", "Shoes", "Clothes"].map((item) => {
            const icon =
              item === "Bags" ? "👜" : item === "Shoes" ? "👠" : "👗";
            return (
              <motion.div
                onClick={() => navigate("/products")}
                key={item}
                whileHover={{ scale: 1.05 }}
                className="bg-pink-50 dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center p-5"
              >
                <div
                  className="text-3xl sm:text-4xl mb-2"
                  aria-label={item}
                  title={item}
                >
                  {icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-pink-600">
                  {item}
                </h3>
                <p className="text-gray-500 dark:text-gray-200 text-sm sm:text-base text-center mt-1">
                  Explore our collection of {item.toLowerCase()} for every
                  occasion.
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          onClick={() => navigate("/products")}
          className="text-center mt-10 sm:mt-12"
          variants={childVariants}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-500 text-white px-6 py-3 w-full sm:w-auto rounded-md font-medium shadow hover:bg-pink-400 transition"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
