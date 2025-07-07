import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

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
        <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-6 sm:my-10" />

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

        {/* Sections Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={childVariants}
        >
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
              content: [
                "You always come first",
                "Style with care for the planet",
                "We choose quality, not quantity",
                "We welcome all styles, backgrounds, and people",
              ],
            },
            {
              title: "Why Shop With Us?",
              content: [
                "Fast & free shipping",
                "Easy 10-day returns",
                "Secure checkout experience",
                "24/7 customer support",
              ],
            },
          ].map(({ title, content }, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-7 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              variants={childVariants}
            >
              <h3 className="text-xl font-bold mb-3 text-pink-500">{title}</h3>
              <div className="text-gray-600 dark:text-gray-200 text-sm sm:text-base leading-relaxed space-y-2">
                {Array.isArray(content) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {content.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10"
          variants={childVariants}
        >
          {["Bags", "Shoes", "Clothes"].map((item, index) => {
            const icon =
              item === "Bags" ? "👜" : item === "Shoes" ? "👠" : "👗";
            const hoverRotation = index === 0 ? 1 : index === 1 ? 0 : -1;

            return (
              <motion.div
                key={item}
                onClick={() =>
                  navigate(`/products/category/${item.toUpperCase()}`)
                }
                whileHover={{ scale: 1.05, rotate: hoverRotation }} 
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="bg-white/20 dark:bg-gray-800 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-center rounded-2xl shadow-xl hover:shadow-pink-500/20 dark:hover:shadow-gray-800 transition-shadow duration-300 cursor-pointer p-6 flex flex-col items-center"
              >
                <div
                  className="text-4xl sm:text-5xl mb-3"
                  aria-label={item}
                  title={item}
                >
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-pink-500">{item}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mt-1">
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
          <Button className="bg-pink-500 px-6 py-3 w-full sm:w-auto rounded-md font-medium shadow hover:bg-pink-600 transition cursor-pointer">
            Shop Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
