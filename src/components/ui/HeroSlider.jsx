import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
// Images
import menGlasses from "../../assets/menGlasses.avif";
import womenGlasses from "../../assets/womenGlasses.webp";
import shirt_1 from "../../assets/shirtModel.webp";
import shirt_2 from "../../assets/shirtModelGirl.jpg";
import summer_1 from "../../assets/summerModel.webp";
import summer_2 from "../../assets/summerModel2.jpg";
import sneaker1 from "../../assets/sneaker1.avif";
import sneaker2 from "../../assets/sneaker2.webp";

const slides = [
  {
    titleLines: ["TRENDY", "OUTFITS"],
    subtitle: "Trending Clothes",
    startingAt: 25,
    description: "Perfect for everyday style with premium comfort.",
    images: [shirt_1, shirt_2],
    ctaText: "Shop Now",
  },
  {
    titleLines: ["SUMMER", "COLLECTION"],
    subtitle: "New Arrivals",
    startingAt: 35,
    description: "Beat the heat in style with our fresh summer picks.",
    images: [summer_2, summer_1],
    ctaText: "Explore Collection",
  },
  {
    titleLines: ["STYLISH", "SUNGLASSES"],
    subtitle: "Hot Picks",
    startingAt: 15,
    description: "Upgrade your look with our latest eyewear.",
    images: [womenGlasses, menGlasses],
    ctaText: "View Shades",
  },
  {
    titleLines: ["BOLD", "FOOTWEAR"],
    subtitle: "Stand Out",
    startingAt: 60,
    description: "Make every step stylish with our latest shoes.",
    images: [sneaker2, sneaker1],
    ctaText: "Explore Shoes",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const intervalRef = useRef(null);

  const startAutoSlide = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 5500);
  }, [isPaused, slides.length]);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const handleDotClick = useCallback(
    (index) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      startAutoSlide();
    },
    [current, startAutoSlide]
  );

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide();
  }, [slides.length, startAutoSlide]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  }, [slides.length, startAutoSlide]);

  const slide = slides[current];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative flex flex-col-reverse md:flex-row bg-pink-50 dark:bg-black dark:bg-gradient-to-tl dark:from-gray-900 via-black dark:to-gray-900 p-8 items-center justify-evenly gap-12 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Text */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current + "-text"}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="space-y-5 flex flex-col items-center md:items-baseline text-center md:text-left max-w-md"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300 tracking-wide uppercase">
            {slide.subtitle}
          </h2>

          <h1 className="text-4xl xs:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 leading-tight whitespace-pre-line drop-shadow-sm">
            {slide.titleLines.join("\n")}
          </h1>

          <p className="text-xs xs:text-base md:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-medium">
            {slide.description}
          </p>

          <p className="text-gray-700 dark:text-gray-100 text-md md:text-lg font-medium">
            Starting at{" "}
            <span className="text-pink-500 font-bold">
              ${slide.startingAt}.00
            </span>
          </p>

          <Button
            onClick={() => navigate("/products")}
            className="w-fit px-6 py-3 bg-pink-500 hover:bg-pink-600 font-semibold rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {t(slide.ctaText)}
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Slide Images */}
      <div className="relative w-[260px] h-[220px] sm:w-[300px] sm:h-[260px] md:w-[360px] md:h-[300px] ">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={slide.images[0]}
            src={slide.images[0]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-0 sm:left-28 left-24 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[210px] md:h-[210px] lg:w-[240px] lg:h-[240px] object-cover rounded-full border-4 border-pink-100 dark:border-gray-300 z-10"
          />
        </AnimatePresence>

        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={slide.images[1]}
            src={slide.images[1]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 sm:-left-8 -left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[210px] md:h-[210px] lg:w-[240px] lg:h-[240px] object-cover rounded-full border-4 border-pink-100 dark:border-gray-300 z-20"
          />
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 flex justify-center w-full space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === current ? "bg-pink-500 scale-110" : "bg-pink-200"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
