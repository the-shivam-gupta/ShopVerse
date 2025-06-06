import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { ProductCard } from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import { motion, AnimatePresence } from "framer-motion";
import CompareModal from "./CompareModal";

const FavoritesPage = ({ currency }) => {
  const { favorites, addToFavorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { compareList, isCompareOpen, addToCompare, clearCompare } =
    useCompare();

  if (favorites.length === 0) {
    return (
      <div className="dark:bg-black w-full h-[100dvh]">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">
            {t("favorite.favorites")}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {t("favorite.noFavItem")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-100">
        {t("favorite.favorites")}
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-8 w-full">
        {favorites.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            currency={currency}
            addToFavorites={addToFavorites}
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCompare={addToCompare}
            compareList={compareList}
            isCompareOpen={isCompareOpen}
            handleCloseCompare={clearCompare}
            addToCart={addToCart}
          />
        ))}
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
  );
};

export default FavoritesPage;
