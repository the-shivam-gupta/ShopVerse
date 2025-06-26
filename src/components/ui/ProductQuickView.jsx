import React, { useState, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import { Star, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Button } from "./Button";
import BadgeRibbon from "./BadgeRibbon";
import toast from "react-hot-toast";

const ProductQuickView = ({ product, isOpen, onClose, currency }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(() => {
    const cartProduct = { ...product, image: product.mainImage };
    addToCart(cartProduct);
    setAdded(true);
    setIsAnimating(true);
    setTimeout(() => {
      setAdded(false);
      setIsAnimating(false);
    }, 1000);
  }, [addToCart, product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl bg-transparent rounded-xl">
            <motion.div
              className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="border border-white dark:border-gray-400 w-[90%] max-w-3xl rounded-xl shadow-2xl dark:shadow-md dark:shadow-gray-400 p-6 relative dark:bg-transparent bg-white/20 backdrop-blur"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-800 hover:text-black dark:text-white dark:hover:text-gray-200 cursor-pointer z-1"
              >
                <X size={24} />
              </button>

              <div className="max-h-[90vh] overflow-y-auto scrollbar-hide p-4 sm:p-6 w-full md::w-[750px]">
                <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-12 items-center overflow-hidden w-full">
                  {/* Product Image */}
                  <img
                    src={isHovered ? product.hoverImage : product.mainImage}
                    alt={t(product.name)}
                    className="w-1/2 sm:w-[40%] md:w-[60%] lg:w-1/2 max-h-56 object-contain rounded-lg transition-all duration-300 ease-linear"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />

                  {/* Badge */}
                  <BadgeRibbon
                    className="absolute -left-7 top-4 sm:-left-8 sm:top-5 md:-left-9 md:top-5 w-[120px] sm:w-[140px] md:w-[150px] rotate-[-45deg] bg-green-500 text-white text-xs sm:text-sm font-semibold text-center py-1 shadow-md z-10"
                    badge={product.badge}
                  />

                  {/* Product Info */}
                  <div className="flex flex-col gap-2 items-center sm:items-start justify-center w-full sm:w-[45%] lg:w-[40%] text-center sm:text-left">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      {t(product.name)}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-100 uppercase">
                      {t(product.category)}
                    </p>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {product.description}
                      </p>
                    )}

                    {/* Colors */}
                    {product.colors?.length > 0 && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap justify-center sm:justify-start">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Color:
                        </span>
                        {product.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:scale-110"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    )}

                    {/* Sizes */}
                    {product.sizes?.length > 0 && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap justify-center sm:justify-start">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Size:
                        </span>
                        {product.sizes.map((size, i) => (
                          <span
                            key={i}
                            className="min-w-[2.5rem] h-10 px-2 flex items-center justify-center text-sm border border-gray-300 rounded-md dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200/30 dark:hover:bg-gray-700/30 cursor-pointer"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stock */}
                    {product.inStock !== undefined && (
                      <p
                        className={`text-sm font-medium ${
                          product.inStock ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    )}

                    {/* Ratings */}
                    {product.rating && (
                      <div className="flex items-center justify-center sm:justify-start text-yellow-400 mt-2">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            fill={
                              index < Math.floor(product.rating)
                                ? "orange"
                                : "none"
                            }
                            strokeWidth={1}
                            className="border-yellow-200 dark:border-yellow-400"
                          />
                        ))}
                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:ml-2">
                          ({product.reviewCount || 0} reviews)
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                      <p className="sm:text-lg text-green-500 font-bold">
                        {currency === "USD"
                          ? `$${product.price}`
                          : `₹${Math.round(product.price * 83)}`}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 line-through">
                        {currency === "USD"
                          ? `$${product.originalPrice}`
                          : `₹${Math.round(product.originalPrice * 83)}`}
                      </p>
                    </div>

                    {/* Add to Cart */}
                    <Button
                      onClick={() => {
                        if (!product.inStock) {
                          toast.error(t("card.outOfStockMessage"), {
                            icon: "🚫",
                          });
                          return;
                        }
                        handleAddToCart();
                        toast.success(
                          t("card.addedToCartMessage", {
                            category: t(product.category),
                          })
                        );
                      }}
                      className={`p-2 rounded-full shadow transition-all ${
                        product.inStock
                          ? "mt-2 mb-2 bg-pink-400 text-white px-4 py-[10px] rounded-sm hover:bg-pink-500 cursor-pointer duration-200 ease-linear"
                          : "mt-2 mb-2 bg-pink-400 text-white px-4 py-[10px] rounded-sm hover:bg-pink-500 duration-200 ease-linear cursor-no-drop opacity-60"
                      }`}
                    >
                      {added ? t("card.added") : t("card.addToCart")}
                    </Button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
export default ProductQuickView;
