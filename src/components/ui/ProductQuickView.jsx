import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const ProductQuickView = ({ product, isOpen, onClose, currency }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      image: product.mainImage,
    };
    addToCart(cartProduct);

    setAdded(true);
    setIsAnimating(true);
    // Reset states
    setTimeout(() => {
      setAdded(false);
      setIsAnimating(false);
    }, 1000);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-transparent bg-opacity-30 rounded-xl">
            {/* Backdrop with animation */}
            <motion.div
              className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel with animation */}
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="border border-white dark:border-gray-200 w-[90%] max-w-2xl rounded-xl shadow-2xl p-6 relative bg-white"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-800 hover:text-black cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={isHovered ? product.hoverImage : product.mainImage}
                  alt={t(product.name)}
                  className="w-full md:w-1/2 object-contain rounded-lg transition-all duration-300 ease-linear"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />

                <div className="flex flex-col gap-3 items-start justify-center text-black dark:text-white">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {t(product.name)}
                  </h2>
                  <p className="text-gray-700">{t(product.category)}</p>
                  <p className="text-lg text-green-600 font-bold">
                    {currency === "USD"
                      ? `$${product.price}`
                      : `₹${Math.round(product.price * 83)}`}
                  </p>
                  <p className="text-gray-500 line-through">
                    {currency === "USD"
                      ? `$${product.originalPrice}`
                      : `₹${Math.round(product.originalPrice * 83)}`}
                  </p>

                  <motion.button
                    onClick={handleAddToCart}
                    animate={isAnimating ? { scale: [1, 1.8, 1] } : {}}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="bg-pink-400 text-white px-4 py-2 rounded-sm hover:bg-pink-500 cursor-pointer duration-200 ease-linear"
                  >
                    {added ? t("card.added") : t("card.addToCart")}
                  </motion.button>
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
