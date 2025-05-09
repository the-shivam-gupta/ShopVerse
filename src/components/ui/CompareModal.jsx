import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CompareModal = ({ products, isOpen, onClose, currency }) => {
  const { t } = useTranslation();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (products.length < 2) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-transparent bg-opacity-30 rounded-xl" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-w-4xl w-full bg-transparent backdrop-blur-xl rounded-xl p-10 shadow-xl focus:outline-none"
        >
          {/* Close button (focusable) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-800 hover:text-black cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
            {t("compare.compareProduct")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.name}
                onMouseEnter={() => setHoveredProduct(product.name)}
                onMouseLeave={() => setHoveredProduct(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 border rounded-xl flex flex-col items-center justify-around border-gray-300"
              >
                <img
                  src={
                    hoveredProduct === product.name
                      ? product.hoverImage
                      : product.mainImage
                  }
                  alt={product.name}
                  className="w-45 h-45 object-contain mb-3"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-gray-700 text-center">
                  {t(product.name)}
                </h3>
                <p className="text-sm text-gray-500">{t(product.category)}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <p className="text-green-600 font-bold">
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
    </Dialog>
  );
};

export default CompareModal;
