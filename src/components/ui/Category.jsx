import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { products } from "../ui/ProductCard";
import { Star } from "lucide-react";

export default function CategorySection({ currency }) {
  const [openCategories, setOpenCategories] = useState({});
  const [animatedCategories, setAnimatedCategories] = useState({});
  const [currentReview, setCurrentReview] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSearchQuery } = useSearch();

  const toggleCategory = useCallback((category) => {
    setOpenCategories((prev) => ({ [category]: !prev[category] }));
  }, []);

  const handleItemClick = useCallback(
    (name) => {
      setSearchQuery(t(name));
      navigate("/products");
    },
    [setSearchQuery, navigate, t]
  );

  const handleAnimated = useCallback((catId) => {
    setAnimatedCategories((prev) => ({
      ...prev,
      [catId]: true,
    }));
  }, []);

  // Animate numbers
  function AnimatedCountRow({
    name,
    count,
    shouldAnimate,
    onAnimated,
    onClick,
  }) {
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
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="cursor-pointer inline-block origin-left text-sm"
        >
          ~ {name}
        </motion.span>
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
  const reviews = useMemo(
    () => [
      {
        text: "I absolutely love the collection! The designs are unique and the quality exceeded my expectations.",
        name: "Emily",
        title: "Fashion Blogger",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        stars: "⭐⭐⭐⭐",
      },
      {
        text: "The delivery was incredibly fast, and the products arrived in perfect condition.",
        name: "Michael",
        title: "E-commerce Enthusiast",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        stars: "⭐⭐⭐⭐",
      },
      {
        text: "Great customer service—very helpful and smooth process.",
        name: "Sarah",
        title: "Marketing Manager",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        stars: "⭐⭐⭐⭐⭐",
      },
      {
        text: "Beautiful packaging, very impressed!",
        name: "Anna",
        title: "Creative Director",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        stars: "⭐⭐⭐⭐⭐",
      },
      {
        text: "The quality is great, and the sizing was just right. I'm happy with my purchase overall.",
        name: "Daniel",
        title: "Lifestyle Reviewer",
        image: "https://randomuser.me/api/portraits/men/51.jpg",
        stars: "⭐⭐⭐⭐",
      },
      {
        text: "Affordable and stylish!",
        name: "Sophia",
        title: "Student & Shopper",
        image: "https://randomuser.me/api/portraits/women/24.jpg",
        stars: "⭐⭐⭐⭐⭐",
      },
    ],
    []
  );

  // Testimonial
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000); // rotates every 5s
    return () => clearInterval(interval);
  }, [reviews.length]);

  const categories = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <div className="lg:sticky lg:top-4 h-fit">
      <div className="w-full md:w-70 h-fit p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-500 bg-gradient-to-tr from-white to-pink-50 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-gray-600">
        <h2 className="text-lg font-bold mb-4 dark:text-gray-200">
          {t("category.category")}
        </h2>

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
                      onAnimated={() => handleAnimated}
                      onClick={handleItemClick}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Top Discounted Products - Randomized on Reload */}
      <div className="w-full md:w-70 h-fit mt-4 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-500 from-white to-pink-50 bg-gradient-to-tr dark:from-gray-800 dark:to-gray-600">
        <h3 className="text-lg font-bold mb-2 text-gray-600 dark:text-gray-200">
          {t("deals.HotPicks")}
        </h3>

        {(() => {
          const filtered = products.filter((p) => p.badge);

          // Get only unique badge products
          const uniqueBadgeMap = new Map();
          for (const product of filtered) {
            if (!uniqueBadgeMap.has(product.badge)) {
              uniqueBadgeMap.set(product.badge, product);
            }
          }

          // Convert to array
          const uniqueProducts = Array.from(uniqueBadgeMap.values());

          // 🔀 Shuffle array randomly
          for (let i = uniqueProducts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [uniqueProducts[i], uniqueProducts[j]] = [
              uniqueProducts[j],
              uniqueProducts[i],
            ];
          }

          // Get random 5
          return uniqueProducts.slice(0, 5).map((product) => (
            <motion.div
              key={product.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3 my-2 p-3 rounded-lg hover:bg-pink-100 dark:hover:bg-gray-700 transition cursor-pointer "
            >
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-16 h-16 object-contain rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium dark:text-gray-200">
                  {t(product.category)}
                </span>
                <span className="text-xs text-pink-500 font-semibold capitalize">
                  ({product.badge})
                </span>

                {/* Ratings */}
                {product.rating && (
                  <div className="flex items-center justify-center sm:justify-start text-yellow-400 w-34 flex-nowrap">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        fill={
                          index < Math.floor(product.rating) ? "orange" : "none"
                        }
                        strokeWidth={1}
                        className="w-4 h-4 border-yellow-200 dark:border-yellow-400"
                      />
                    ))}
                    <span className="text-gray-700 dark:text-gray-300 text-[12px] ml-1 mt-1 whitespace-nowrap">
                      ({product.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center sm:justify-start gap-2">
                  <p className="sm:text-sm dark:text-white text-black font-bold">
                    {currency === "USD"
                      ? `$${product.price}`
                      : `₹${Math.round(product.price * 83)}`}
                  </p>
                  <p className="sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                    {currency === "USD"
                      ? `$${product.originalPrice}`
                      : `₹${Math.round(product.originalPrice * 83)}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ));
        })()}
      </div>

      {/* Rotating Reviews BELOW */}
      <div className="w-full max-w-sm mx-auto mt-6 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-center min-h-[450px] flex flex-col justify-start bg-gradient-to-br from-white to-pink-50 dark:bg-gradient-to-bl dark:from-gray-800 dark:to-gray-600">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 border-b border-pink-200 dark:border-gray-500 pb-2">
          {t("testimonial.testimonial")} 💬 
        </h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center flex-grow"
          >
            <img
              src={reviews[currentReview].image}
              alt={reviews[currentReview].name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-lg font-bold text-gray-700 dark:text-white uppercase">
              {reviews[currentReview].name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-">
              {reviews[currentReview].title}
            </p>
            <div className="text-pink-500 text-6xl leading-none">“</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm px-">
              {reviews[currentReview].text}
            </p>
            <p className="text-sm text-yellow-500 mt-1">
              {reviews[currentReview].stars}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
