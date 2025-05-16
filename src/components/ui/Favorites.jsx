import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { ProductCard } from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";

const FavoritesPage = ({
  currency,
  onAddToCompare,
  compareList,
  isCompareOpen,
  handleCloseCompare,
}) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const { t } = useTranslation();

  if (favorites.length === 0) {
    return (
      <div className="dark:bg-gray-800 w-full h-[100dvh]">
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-100">
        Your Favorites
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full">
        {favorites.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            currency={currency}
            addToFavorites={() => removeFromFavorites(product.name)}
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCompare={onAddToCompare}
            compareList={compareList}
            isCompareOpen={isCompareOpen}
            handleCloseCompare={handleCloseCompare}
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
    </div>
  );
};

export default FavoritesPage;
