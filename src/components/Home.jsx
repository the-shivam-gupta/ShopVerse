import { useState } from "react";
import { Button } from "./ui/Button";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import CategorySection from "./ui/Category";
import { ProductCard, products } from "./ui/ProductCard";
import { useTranslation, Trans } from "react-i18next";
import ProductQuickView from "./ui/ProductQuickView";
import { useEffect } from "react";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import CompareModal from "./ui/CompareModal";

// Categories
const categories = [
  {
    title: "home.dressFrock",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRNOnNkNLvhJzFjPcVBF-qLnL4bhsuHTP55WuJMjKeFSu45GDlJ9EBo3wSGRsRJaezjq6tgbgOLLB8K_ziaxn955uAP_6S0NAI-RSl82USAOiIxqRbBTDxc4A",
  },
  {
    title: "home.winterWear",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSrKTscbtQ8QKRsf6CBYARR-Y4RtaY5bROl6PscKXJHZs3XArHTHfGWkVdK9bihlIbgamhkF1N5KGHoGTCLcnKRqSLID4mEYcXyJfHJlhPeGKdGpSM29LO8",
  },
  {
    title: "home.glassesLens",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR-2Urt6AIRZ7Ydf0eBwldZWw_zvKD7LqY4889550WBu-1xtkBfPqbcaxfmoZDhg8sPHgVsb4tlKMX7OUykYcJZZF7S2M3UuTiQIecXU5VyZZyp7sphElB6",
  },
  {
    title: "home.shortsJeans",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTINklJcWRMAt_UXYIcJD2Z5SyUJOyiNPsT8BlQg5W6OPcYaCuqaxQLeDQXEFNiS7S1uej8T295KIJpqQKaOwcAcD65t3tW1USN76tryJ557KOxt0kAZNbaAcieJt5rLcUgW0gJmnjG&usqp=CAc",
  },
  {
    title: "home.tShirts",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRCCo_XrKYVY7Ws4lyRz9FA8TKXvyaN-Ji4N-Ox_MR1KKtBYbT6ALn37JTl91TjLmURpxpuSDDI1sDl_e_Lf1MT4Ckf3L3wM07Tih_dMcS0BkjwudrJECgKJknHSDSGwg&usqp=CAc",
  },
  {
    title: "home.watch",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTsay796aiXUQQRhvAJLCJvUnpWlCnQxW_by-dozwPo58EarZ_chd9s0dsaxNjHLRwYtdMha1NLyfcUUlORrErsq2PynKwWsFXOKj-i3v1L9Y2QxlGfoCsdvg",
  },
];

export default function Home({ currency }) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  const handleAddToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.name === product.name)) return prev; // Check if already in compare list
      if (prev.length >= 2) return prev; // Allow only 2 products in compare list
      return [...prev, product]; // Add product to compare list
    });
    setIsCompareOpen(true); // Open compare modal
  };

  const handleCloseCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
  };

  // Scroll effect on Categories
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      },
    });
  }, [controls]);

  // creates a new array with items in random order.
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const randomOrder = shuffleArray(products);
    setShuffledProducts(randomOrder);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <section className="flex flex-col-reverse md:flex-row bg-pink-50 dark:bg-gray-800 p-8 items-center justify-evenly gap-12">
        <div className="space-y-4 text-center md:text-left max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-50">
            {t("home.trendingAccessories")}
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-400 leading-tight">
            <Trans i18nKey="home.modernSunglasses">
              MODERN <br /> SUNGLASSES
            </Trans>
          </h1>
          <p className="dark:text-gray-100">
            {t("home.startingAt")}
            <span className="font-bold">
              $ <span className="text-lg font-extrabold">15</span>.00
            </span>
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="bg-pink-500 hover:bg-pink-400 cursor-pointer rounded-sm px-4 py-2"
          >
            {t("home.shopNow")}
          </Button>
        </div>
        <div className="relative w-[250px] md:w-[320px] h-[180px] md:h-[220px]">
          <img
            src="./src/assets/image.png"
            alt="Model 1"
            className="absolute -left-10 bottom-2 w-[150px] md:w-[250px] rounded-full border-4 border-pink-100 dark:border-gray-300 z-10"
          />
          <img
            src="./src/assets/womenGlasses.png"
            alt="Model 2"
            className="absolute left-20 md:left-28 top-6 w-[150px] md:w-[250px] rounded-full border-4 border-pink-100 dark:border-gray-300 z-20"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="overflow-hidden p-8">
        <motion.div
          className="flex gap-6 flex-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35, // speed (smaller = faster)
            ease: "linear",
          }}
        >
          {[...categories, ...categories].map((item, id) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={id}
              className="backdrop-blur-lg dark:bg-gray-700 border border-pink-200 dark:border-gray-400 p-5 rounded-xl shadow-xl dark:shadow-gray-300 dark:shadow-sm w-45 text-center hover:shadow-2xl hover:bg-white dark:hover:bg-gray-500 cursor-pointer"
            >
              <div className="relative">
                <img
                  className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-pink-400 p-1 object-cover bg-gradient-to-tr from-pink-100 to-pink-200"
                  src={item.image}
                  alt="category"
                />
              </div>
              <div className="text-lg font-bold text-gray-800 dark:text-gray-100 drop-shadow-sm">
                {t(item.title)}
              </div>
              <button
                onClick={() => navigate("/products")}
                className="mt-3 text-pink-500 text-sm rounded-full bg-pink-100 hover:bg-pink-200 px-4 py-1 transition-all cursor-pointer"
              >
                {t("home.showAll")}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="flex flex-col md:flex-row px-6 py-8 gap-6">
        {/* Sidebar */}
        <CategorySection />

        {/* Product Grids */}
        <div className="min-h-screen bg-gray-100 dark:bg-gray-700 p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {shuffledProducts.map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                currency={currency}
                onQuickView={(p) => setSelectedProduct(p)}
                onAddToCompare={handleAddToCompare}
                compareList={compareList}
                isCompareOpen={isCompareOpen}
                handleCloseCompare={handleCloseCompare}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
        {/* Quick View Modal */}
        <ProductQuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          currency={currency}
          onClose={() => setSelectedProduct(null)}
        />

        {/* Compare items */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 bg-white dark:bg-gray-200 p-6 shadow-2xl rounded-2xl w-80 z-50"
            >
              <h4 className="font-bold mb-4 text-lg text-gray-700 dark:text-gray-800">
                {t("compare.compareItems")}
              </h4>
              {compareList.map((item) => (
                <p key={item.name} className="text-md text-gray-600 dark:text-gray-700">
                  {t(item.name)}
                </p>
              ))}
              <button
                onClick={() => setIsCompareOpen(true)}
                className="mt-6 w-full py-3 bg-pink-400 text-white font-semibold text-base rounded-xl hover:bg-pink-500 transition cursor-pointer"
              >
                {t("compare.selectProduct")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <CompareModal
          products={compareList}
          isOpen={isCompareOpen}
          onClose={handleCloseCompare}
          currency={currency}
        />
      </div>
    </div>
  );
}
