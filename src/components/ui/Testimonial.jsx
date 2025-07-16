import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialCarousel() {
  const [centerIndex, setCenterIndex] = useState(0);

  // Reviews
  const reviews = useMemo(
    () => [
      {
        text: "I absolutely love the collection! The designs are unique and the quality exceeded my expectations.",
        name: "Emily",
        title: "Fashion Blogger",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        stars: "★★★★",
      },
      {
        text: "The delivery was incredibly fast, and the products arrived in perfect condition.",
        name: "Michael",
        title: "E-commerce Enthusiast",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        stars: "★★★★",
      },
      {
        text: "Great customer service—very helpful and smooth process.",
        name: "Sarah",
        title: "Marketing Manager",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        stars: "★★★★★",
      },
      {
        text: "Beautiful packaging, very impressed!",
        name: "Anna",
        title: "Creative Director",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        stars: "★★★★★",
      },
      {
        text: "The quality is great, and the sizing was just right. I'm happy with my purchase overall.",
        name: "Daniel",
        title: "Lifestyle Reviewer",
        image: "https://randomuser.me/api/portraits/men/51.jpg",
        stars: "★★★★",
      },
      {
        text: "Affordable and stylish!",
        name: "Sophia",
        title: "Student & Shopper",
        image: "https://randomuser.me/api/portraits/women/24.jpg",
        stars: "★★★★★",
      },
    ],
    []
  );

  const getIndices = (center) => {
    const len = reviews.length;
    return [(center - 1 + len) % len, center, (center + 1) % len];
  };

  const visibleIndices = getIndices(centerIndex);
  const [left, center, right] = visibleIndices;

  const handleAvatarClick = (clickedIndex) => {
    if (clickedIndex === left) {
      setCenterIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    } else if (clickedIndex === right) {
      setCenterIndex((prev) => (prev + 1) % reviews.length);
    }
  };

  return (
    <div className="w-full flex justify-center py-6 bg-gray-100 dark:bg-gray-900 px-4 ">
      <div className="relative flex flex-col items-center text-center z-10 max-w-3xl w-full">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8"
        >
          What Our Customers Are Saying
        </motion.h2>

        {/* Feedback Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={center}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.35,
                ease: "easeOut",
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: {
                duration: 0.25,
                ease: "easeIn",
              },
            }}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg px-8 py-10 w-[90vw] max-w-xl z-10"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {reviews[center].title}
            </h3>
            {/* Wrapper to manage hover state */}
            <div className="group relative max-w-lg text-center">
              <p
                className={
                  "text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 ease-in-out line-clamp-1 group-hover:line-clamp-none"
                }
              >
                {reviews[center].text}
              </p>
            </div>

            <p className="flex justify-center text-orange-300 mt-1 mb-2 text-2xl">
              {reviews[center].stars}
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {reviews[center].name}
            </p>
            {/* Tail */}
            <div className="absolute left-1/2 bottom-[-12px] transform -translate-x-1/2 w-0 h-0 rotate-125 border-l-20 border-r-20 border-t-[20px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800 z-0" />
          </motion.div>
        </AnimatePresence>

        {/* Avatar Layout */}
        <div className="relative w-[300px] h-[180px] mt-[-12px]">
          {[left, center, right].map((idx, i) => {
            const isCenter = i === 1;

            const angleMap = [200, 270, 340];
            const radius = 100;
            const yOffset = i === 1 ? 90 : 0;
            const angle = (angleMap[i] * Math.PI) / 180;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle) + yOffset;

            return (
              <motion.img
                key={idx}
                src={reviews[idx].image}
                alt={reviews[idx].name}
                onClick={() => handleAvatarClick(idx)}
                className={`absolute rounded-full object-cover border-4 cursor-pointer hover:scale-110 transition-all duration-300 ${
                  isCenter
                    ? "w-20 h-20 border-white shadow-md z-20"
                    : "w-14 h-14 border-gray-300 opacity-80"
                }`}
                style={{
                  top: `calc(50% + ${y}px - ${isCenter ? 40 : 28}px)`,
                  left: `calc(50% + ${x}px - ${isCenter ? 40 : 28}px)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
