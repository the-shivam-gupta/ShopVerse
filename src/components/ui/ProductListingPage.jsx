import React, { useState } from "react";
import { ProductCard, products as allProducts } from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import ProductQuickView from "./ProductQuickView";

const categoryStructure = {
  SHIRTS: [
    "SHIRT",
    "OVERSIZE SHIRT",
    "CASUAL SHIRT",
    "FORMAL SHIRT",
    "DENIM SHIRT",
    "PRINTED SHIRT",
  ],
  ACCESSORIES: [
    "WATCH",
    "BRACELET",
    "NECKLACE",
    "RINGS",
    "SUNGLASSES",
    "WALLET",
  ],
  ELECTRONICS: [
    "HEADPHONE",
    "SMARTPHONE",
    "TABLET",
    "LAPTOP",
    "POWER BANK",
  ],
  BOTTOMS: ["SKIRT", "JEANS", "TROUSERS", "SHORTS", "JOGGERS", "CULOTTES"],
  OUTERWEAR: ["JACKET", "BLAZER", "COAT", "HOODIE", "CARDIGAN", "VEST"],
  FOOTWEAR: ["SHOES", "SNEAKERS", "SANDALS", "BOOTS", "FLIP FLOPS", "LOAFERS"],
  BAGS: ["BACKPACK", "HANDBAG", "TOTE BAG", "MESSENGER BAG", "DUFFEL BAG"],
  BEAUTY: ["SKINCARE", "MAKEUP", "PERFUME", "HAIRCARE", "GROOMING KIT"],
};

const ProductListingPage = ({
  currency,
  onAddToCompare,
  compareList = [],
  isCompareOpen,
  handleCloseCompare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortType, setSortType] = useState("default");
  const [expandedCategory, setExpandedCategory] = useState(null); //tracks which parent’s subcategories are visible
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const filterAndSortProducts = () => {
    let filtered = allProducts.filter((p) => {
      const translatedCategory = t(p.category).toUpperCase();
      const productParent = Object.keys(categoryStructure).find((parent) =>
        categoryStructure[parent].includes(translatedCategory)
      );

      const inCategory =
        selectedCategory === "All" ||
        translatedCategory === selectedCategory ||
        productParent === selectedCategory;

      const inPriceRange = p.price >= priceRange[0] && p.price <= priceRange[1];

      return inPriceRange && inCategory;
    });

    if (sortType === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortType === "ratingHighLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const displayedProducts = filterAndSortProducts();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      {/* Sidebar Filters */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:sticky lg:top-6 w-full md:w-1/5 space-y-4 flex flex-col px-5 py-6 shadow-xl h-fit rounded-xl bg-linear-to-tr from-white to-pink-50 border border-gray-200"
      >
        <div className="border p-3 border-pink-100 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">
            {t("filter.category")}
          </h2>
          <button
            onClick={() => {
              setExpandedCategory(null);
              setSelectedCategory("All");
            }}
            className={`block w-full text-left px-3 py-1 rounded cursor-pointer ${
              selectedCategory === "All"
                ? "bg-pink-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {Object.entries(categoryStructure).map(([parent, subcategories]) => (
            <div key={parent}>
              <button
                onClick={() => {
                  setExpandedCategory(
                    expandedCategory === parent ? null : parent
                  );
                  setSelectedCategory(parent);
                }}
                className={`block w-full text-left px-3 py-1 rounded cursor-pointer ${
                  selectedCategory === parent
                    ? "bg-pink-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {parent}
              </button>

              {/* Expand subcategories */}
              <AnimatePresence>
                {expandedCategory === parent && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-4 overflow-hidden"
                  >
                    {subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedCategory(sub)}
                        className={`block w-full text-left px-3 py-1 rounded cursor-pointer ${
                          selectedCategory === sub
                            ? "bg-pink-100 text-pink-600 font-semibold"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        - {sub}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="border p-2 rounded-xl border-pink-100">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("filter.priceRange")}
          </h2>
          <div className="text-sm mt-2">
            {t("filter.upTo")}{" "}
            {currency === "USD"
              ? `$${priceRange[1]}`
              : `₹${Math.round(priceRange[1] * 83)}`}
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full cursor-pointer accent-pink-400"
          />
        </div>

        <div className="p-2">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {t("filter.sortBy")}
          </h2>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full p-2 rounded border cursor-pointer"
          >
            <option value="default">{t("filter.default")}</option>
            <option value="priceLowHigh">{t("filter.priceLowToHigh")}</option>
            <option value="priceHighLow">{t("filter.priceHighToLow")}</option>
            <option value="ratingHighLow">{t("filter.ratingHighToLow")}</option>
          </select>
        </div>
      </motion.aside>

      {/* Products Section */}
      <motion.section
        className="w-1/2 md:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100 p-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {displayedProducts.map((product) => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>
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

export default ProductListingPage;
