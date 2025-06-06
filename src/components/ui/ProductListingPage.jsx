import React, { useEffect, useState } from "react";
import { ProductCard, products as allProducts } from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import ProductQuickView from "./ProductQuickView";
import { useNavigate, useParams } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import CompareModal from "./CompareModal";
import { useSearch } from "../context/SearchContext";

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
  ELECTRONICS: ["HEADPHONE", "SMARTPHONE", "TABLET", "LAPTOP", "POWER BANK"],
  BOTTOMS: ["SKIRT", "JEANS", "TROUSERS", "SHORTS", "JOGGERS", "CULOTTES"],
  OUTERWEAR: ["JACKET", "BLAZER", "COAT", "HOODIE", "CARDIGAN", "VEST"],
  FOOTWEAR: ["SHOES", "SNEAKERS", "SANDALS", "BOOTS", "FLIP FLOPS", "LOAFERS"],
  BAGS: ["BACKPACK", "HANDBAG", "TOTE BAG", "MESSENGER BAG", "DUFFEL BAG"],
  BEAUTY: ["SKINCARE", "MAKEUP", "PERFUME", "HAIRCARE", "GROOMING KIT"],
};

const ProductListingPage = ({ currency }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortType, setSortType] = useState("default");
  const [expandedCategory, setExpandedCategory] = useState(null); //tracks which parent’s subcategories are visible
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "All"
  );
  const { compareList, isCompareOpen, addToCompare, clearCompare } =
    useCompare();
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryName]);

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

    // search query after initial filtering
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting logic
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
    <div className="flex flex-col md:flex-row p-4 gap-6 dark:bg-black">
      {/* Sidebar Filters */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-70 h-fit p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-500 bg-gradient-to-tr from-white to-pink-50 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-gray-600"
      >
        <div className="border p-3 border-pink-100 dark:border-gray-400 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-100">
            {t("filter.category")}
          </h2>
          <button
            onClick={() => {
              setExpandedCategory(null);
              setSelectedCategory("All");
              navigate("/products");
            }}
            className={`block w-full text-left px-3 py-1 rounded cursor-pointer dark:text-gray-100 ${
              selectedCategory === "All"
                ? "bg-pink-500 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-600"
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
                  setSearchQuery("");
                  navigate("/products");
                }}
                className={`block w-full text-left px-3 py-1 rounded cursor-pointer dark:text-gray-100 ${
                  selectedCategory === parent
                    ? "bg-pink-500 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-600"
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
                        onClick={() => {
                          setSelectedCategory(sub);
                          setSearchQuery("");
                          navigate(`/products/category/${sub.toUpperCase()}`);
                        }}
                        className={`block w-full text-left px-3 py-1 rounded cursor-pointer dark:text-gray-200 ${
                          selectedCategory === sub
                            ? "bg-pink-100 dark:bg-pink-400 text-pink-400 dark:text-white font-semibold"
                            : "hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        ~ {sub}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="border p-3 rounded-xl border-pink-100 dark:border-gray-400">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">
            {t("filter.priceRange")}
          </h2>

          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              min={0}
              value={priceRange[0] || ""}
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value));
                setPriceRange([value, Math.max(value, priceRange[1])]);
              }}
              placeholder={t("filter.min")}
              className="w-1/2 p-2 rounded border dark:bg-gray-700 dark:text-white"
            />
            <span className="text-gray-500 dark:text-gray-300">-</span>
            <input
              type="number"
              min={0}
              value={priceRange[1] !== 2000 ? priceRange[1] : ""}
              onChange={(e) => {
                const value = Math.max(1, Number(e.target.value));
                setPriceRange([Math.min(priceRange[0], value), value]);
              }}
              placeholder={t("filter.max")}
              className="w-1/2 p-2 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="p-2">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-100">
            {t("filter.sortBy")}
          </h2>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full p-2 rounded border cursor-pointer dark:text-gray-100 dark:bg-gray-700"
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
        className="flex-[4] min-w-0 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 bg-gray-100 dark:bg-gray-800 p-4 xs:p-6 md:p-10"
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
                onAddToCompare={addToCompare}
                compareList={compareList}
                isCompareOpen={isCompareOpen}
                handleCloseCompare={clearCompare}
                addToCart={addToCart}
              />
            </motion.div>
          ))}
        </AnimatePresence>
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
