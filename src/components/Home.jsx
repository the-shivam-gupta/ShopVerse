import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "./ui/Button";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import CategorySection from "./ui/Category";
import { ProductCard, products } from "./ui/ProductCard";
import { useTranslation, Trans } from "react-i18next";
import ProductQuickView from "./ui/ProductQuickView";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import CompareModal from "./ui/CompareModal";
// Images import:
import { useCompare } from "./context/CompareContext";
import { useSearch } from "./context/SearchContext";
import HeroSlider from "./ui/HeroSlider";
import { useFavorites } from "./context/FavoritesContext";

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
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const { compareList, isCompareOpen, addToCompare, clearCompare } =
    useCompare();
  const { setSearchQuery } = useSearch();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const favoriteNames = useMemo(
    () => new Set(favorites.map((f) => f.name)),
    [favorites]
  );

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
  }, [setShuffledProducts]);

  const handleToggleFavorite = useCallback(
    (product) => {
      const isAlreadyFavorited = favorites.some(
        (item) => item.name === product.name
      );
      isAlreadyFavorited
        ? removeFromFavorites(product.name)
        : addToFavorites(product);
    },
    [favorites, addToFavorites, removeFromFavorites]
  );

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const handleAddToCompare = useCallback((product) => {
    addToCompare(product);
  }, [addToCompare]);
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <HeroSlider />

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
              whileTap={{ scale: 0.99 }}
              key={id}
              className="backdrop-blur-lg dark:bg-gray-800 border border-pink-200 dark:border-gray-700 p-5 rounded-xl shadow-xl dark:shadow-gray-500 dark:shadow-sm w-45 text-center hover:shadow-[0_5px_12px_rgb(0_0_0_/_0.25)] hover:bg-white dark:hover:bg-gray-700 cursor-pointer"
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
                onClick={() => {
                  setSearchQuery(t(item.title)); // translated title as search
                  navigate("/products");
                }}
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
        <CategorySection currency={currency} />

        {/* Product Grids */}
        <div className="bg-gray-100 dark:bg-gray-800 p-10">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {shuffledProducts.map((product, index) => {
              return (
                <ProductCard
                  key={product.name}
                  product={product}
                  currency={currency}
                  onQuickView={handleQuickView}
                  onAddToCompare={handleAddToCompare}
                  compareList={compareList}
                  isCompareOpen={isCompareOpen}
                  handleCloseCompare={clearCompare}
                  onAddToCart={addToCart}
                  isFavorited={favoriteNames.has(product.name)}
                  onToggleFavorite={() => handleToggleFavorite(product)}
                />
              );
            })}
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
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/80 dark:bg-gray-100/80 backdrop-blur-md p-4 sm:p-6 shadow-xl rounded-2xl w-[90vw] max-w-xs sm:max-w-sm z-50"
            >
              <h4 className="font-bold mb-2 text-sm sm:text-lg text-gray-700 dark:text-gray-800">
                {t("compare.compareItems")}
              </h4>

              {compareList.map((item) => (
                <p
                  key={item.name}
                  className="text-sm text-gray-600 dark:text-gray-700 truncate"
                >
                  {t(item.name)}
                </p>
              ))}

              <button className="mt-4 w-full py-2.5 sm:py-3 bg-pink-400 text-white font-semibold text-sm sm:text-base rounded-xl hover:bg-pink-500 transition cursor-pointer">
                {t("compare.selectProduct")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <CompareModal
          products={compareList}
          isOpen={isCompareOpen}
          onClose={clearCompare}
          currency={currency}
        />
      </div>
    </div>
  );
}
