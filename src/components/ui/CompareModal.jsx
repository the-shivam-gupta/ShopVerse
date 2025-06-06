import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Star, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CompareModal = ({ products, isOpen, onClose, currency }) => {
  const { t } = useTranslation();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (products.length < 2) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      {/* Transparent Blurred Backdrop */}
      <div className="fixed inset-0 backdrop-blur-xl bg-white/10 dark:bg-black/10" />

      {/* Scrollable Content Container */}
      <div className="absolute inset-0 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative z-50 flex min-h-screen items-center justify-center sm: p-4 overflow-y-auto">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full bg-white/30 dark:bg-black/30 border border-white/20 dark:border-gray-700 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-700 dark:text-white hover:text-black dark:hover:text-gray-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Modal Title */}
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
                {t("compare.compareProduct")}
              </h2>

              {/* Product Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.name}
                    onMouseEnter={() => setHoveredProduct(product.name)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl border border-white/30 dark:border-gray-600 backdrop-blur-lg bg-white/10 dark:bg-white/10 shadow-md flex flex-col items-center"
                  >
                    <img
                      src={
                        hoveredProduct === product.name
                          ? product.hoverImage
                          : product.mainImage
                      }
                      alt={product.name}
                      className="w-36 h-36 object-contain mb-3"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
                      {t(product.name)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t(product.category)}
                    </p>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center justify-center mt-2 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            fill={
                              i < Math.floor(product.rating) ? "orange" : "none"
                            }
                            strokeWidth={1}
                            className="w-4 h-4"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          ({product.reviewCount || 0} reviews)
                        </span>
                      </div>
                    )}

                    {/* Stock */}
                    <p
                      className={`mt-1 text-sm font-medium ${
                        product.inStock ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="text-green-500 font-bold">
                        {currency === "USD"
                          ? `$${product.price}`
                          : `₹${Math.round(product.price * 83)}`}
                      </p>
                      <p className="text-gray-400 line-through">
                        {currency === "USD"
                          ? `$${product.originalPrice}`
                          : `₹${Math.round(product.originalPrice * 83)}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CompareModal;
