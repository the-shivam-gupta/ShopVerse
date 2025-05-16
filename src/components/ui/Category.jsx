import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function CategorySection() {
  const [openCategories, setOpenCategories] = useState({});
  const [animatedCategories, setAnimatedCategories] = useState({});
  const [currentReview, setCurrentReview] = useState(0);
  const { t } = useTranslation();

  const toggleCategory = (category) => {
    setOpenCategories((prev) => {
      const isOpen = prev[category];
      return {
        [category]: !isOpen, // toggle clicked one
      };
    });
  };

  // Animate numbers
  function AnimatedCountRow({ name, count, shouldAnimate, onAnimated }) {
    const controls = useAnimation();
    const [displayCount, setDisplayCount] = useState(0);
    // Animate count on mount
    useEffect(() => {
      if (shouldAnimate) {
        controls
          .start({
            countValue: count,
            transition: { duration: 1.5, ease: "easeOut" },
          })
          .then(() => {
            onAnimated(); // Mark animation as completed
          });
      } else {
        setDisplayCount(count);
      }
    }, [shouldAnimate, count, controls, onAnimated]);

    return (
      <div className="flex justify-between">
        <span>{name}</span>
        <motion.span
          initial={{ countValue: 0 }}
          animate={controls}
          onUpdate={(latest) => {
            setDisplayCount(Math.round(latest.countValue));
          }}
        >
          {displayCount}
        </motion.span>
      </div>
    );
  }

  // Reviews
  const reviews = [
    {
      text: "I absolutely love the collection! The designs are unique and the quality exceeded my expectations.",
      name: "Emily",
      stars: "⭐⭐⭐⭐",
    },
    {
      text: "The delivery was incredibly fast, and the products arrived in perfect condition. Will definitely order again!",
      name: "Michael",
      stars: "⭐⭐⭐⭐",
    },
    {
      text: "Excellent customer service — they were so helpful with my order and made sure everything went smoothly.",
      name: "Sarah",
      stars: "⭐⭐⭐⭐⭐",
    },
    {
      text: "Beautiful packaging, very impressed!",
      name: "Anna",
      stars: "⭐⭐⭐⭐⭐",
    },
    {
      text: "The quality is great, and the sizing was just right. I'm happy with my purchase overall.",
      name: "Daniel",
      stars: "⭐⭐⭐⭐",
    },
    {
      text: "Affordable and stylish!",
      name: "Sophia",
      stars: "⭐⭐⭐⭐⭐",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      id: "Clothes",
      name: "category.clothes",
      icon: "👗",
      items: [
        { id: "Shirt", name: "category.shirt", count: 300 },
        { id: "ShortAndJeans", name: "category.shortsJeans", count: 60 },
        { id: "Jacket", name: "category.Jacket", count: 50 },
        { id: "DressAndFrock", name: "category.dressFrock", count: 87 },
      ],
    },
    {
      id: "Footwear",
      name: "category.footwear",
      icon: "👠",
      items: [
        { id: "sneakers", name: "category.sneakers", count: 120 },
        { id: "sandals", name: "category.sandals", count: 45 },
        { id: "boots", name: "category.boots", count: 70 },
      ],
    },
    {
      id: "Jewelry",
      name: "category.jewelry",
      icon: "💎",
      items: [
        { id: "necklace", name: "category.necklaces", count: 80 },
        { id: "aerings", name: "category.earings", count: 140 },
        { id: "bracelets", name: "category.bracelets", count: 65 },
      ],
    },
    {
      id: "Perfume",
      name: "category.perfume",
      icon: "🌸",
      items: [
        { id: "floral", name: "category.floral", count: 50 },
        { id: "woody", name: "category.woody", count: 30 },
        { id: "citrus", name: "category.citrus", count: 40 },
      ],
    },
    {
      id: "Cosmetics",
      name: "category.cosmetic",
      icon: "💄",
      items: [
        { id: "lipsticks", name: "category.lipstick", count: 100 },
        { id: "foundation", name: "category.foundation", count: 75 },
        { id: "mascara", name: "category.mascara", count: 55 },
      ],
    },
    {
      id: "Glasses",
      name: "category.glasses",
      icon: "👓",
      items: [
        { id: "sunglasses", name: "category.sunglasses", count: 90 },
        { id: "readingGlasses", name: "category.readingGlasses", count: 40 },
      ],
    },
    {
      id: "Bags",
      name: "category.bags",
      icon: "👜",
      items: [
        { id: "handbags", name: "category.handbags", count: 85 },
        { id: "backpacks", name: "category.backpacks", count: 65 },
      ],
    },
  ];

  return (
    <div className="lg:sticky lg:top-4 h-fit">
      <div className="w-70 h-fit p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-400 bg-gradient-to-tr from-white to-pink-50 dark:bg-gradient-to-tr dark:from-gray-500 dark:to-gray-600">
        <h2 className="text-lg font-bold mb-4 dark:text-gray-200">{t("category.category")}</h2>

        {categories.map((cat) => (
          <div key={cat.id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleCategory(cat.id)}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-bold text-lg text-gray-800  dark:text-gray-50">
                  {t(cat.name)}
                </span>
              </div>
              <span className="dark:text-gray-200">

              {openCategories[cat.id] ? <FaMinus /> : <FaPlus />}
              </span>
            </motion.div>

            <AnimatePresence initial={false}>
              {openCategories[cat.id] && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-8 mt-1 space-y-1 text-gray-500 dark:text-gray-200 font-semibold overflow-hidden"
                >
                  {cat.items.map((item) => (
                    <AnimatedCountRow
                      key={item.id}
                      name={t(item.name)}
                      count={item.count}
                      shouldAnimate={!animatedCategories[cat.id]}
                      onAnimated={() =>
                        setAnimatedCategories((prev) => ({
                          ...prev,
                          [cat.id]: true,
                        }))
                      }
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Rotating Reviews BELOW */}
      <div className="w-70 mt-4 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-400 bg-pink-50 dark:bg-gradient-to-tr dark:from-gray-500 dark:to-gray-600">
        <h3 className="text-lg font-bold mb-2 text-gray-600 dark:text-gray-200">
          {t("testimonial.testimonial")} 💬
        </h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            <p className="mb-2">“{reviews[currentReview].text}”</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              ~ {reviews[currentReview].name} || {reviews[currentReview].stars}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
