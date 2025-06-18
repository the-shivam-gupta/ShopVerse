import { useState, useCallback } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { ProductCard } from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import { motion, AnimatePresence } from "framer-motion";
import CompareModal from "./CompareModal";
import { Button } from "./Button";

const FavoritesPage = ({ currency }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { t } = useTranslation();
  const { compareList, isCompareOpen, addToCompare, clearCompare } = useCompare();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleToggleFavorite = (product) => {
    const isFav = favorites.some((item) => item.name === product.name);
    isFav ? removeFromFavorites(product.name) : addToFavorites(product);
  };

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const handleAddToCompare = useCallback(
    (product) => {
      addToCompare(product);
    },
    [addToCompare]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-100">
        {t("favorite.favorites")}
      </h1>

      <AnimatePresence mode="wait">
        {favorites.length > 0 ? (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-8 w-full"
          >
            {favorites.map((product) => (
              <motion.div
                key={product.name}
                variants={cardVariants}
                layout
                className="w-full h-full"
              >
                <ProductCard
                  product={product}
                  currency={currency}
                  addToFavorites={addToFavorites}
                  onQuickView={handleQuickView}
                  onAddToCompare={handleAddToCompare}
                  compareList={compareList}
                  isCompareOpen={isCompareOpen}
                  handleCloseCompare={clearCompare}
                  onAddToCart={addToCart}
                  isFavorited={favorites.some(
                    (item) => item.name === product.name
                  )}
                  onToggleFavorite={() => handleToggleFavorite(product)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="text-center py-20 w-full"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t("favorite.noFavItem")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Compare Items Modal */}
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
            <Button className="mt-4 w-full py-2.5 sm:py-3 bg-pink-400 text-white font-semibold text-sm sm:text-base rounded-xl hover:bg-pink-500 transition cursor-pointer">
              {t("compare.selectProduct")}
            </Button>
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
  );
};

export default FavoritesPage;
