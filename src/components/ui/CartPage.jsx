import React, { useState, useCallback, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Trans, useTranslation } from "react-i18next";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const CartPage = ({ currency, product }) => {
  const { cart = [], setCart, removeFromCart, addToCartAtIndex } = useCart();
  const { t } = useTranslation();
  const [recentlyRemoved, setRecentlyRemoved] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    const trimmedCategory = product.category.replace(/^card\./, "");
    const trimmedName = product.name.replace(/^card\./, "");
    const encodedCategory = encodeURIComponent(trimmedCategory);
    const encodedName = encodeURIComponent(trimmedName);
    navigate(`/product/${encodedCategory}/${encodedName}`);
  };

  const conversionRate = 83;

  const getPrice = useCallback(
    (price) =>
      currency === "USD"
        ? `$${price}`
        : `₹${Math.round(price * conversionRate)}`,
    [currency]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const originalTotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0),
    [cart]
  );

  const discountTotal = useMemo(
    () => originalTotal - subtotal,
    [originalTotal, subtotal]
  );

  const discountPercentage = useMemo(
    () =>
      originalTotal > 0 ? Math.round((discountTotal / originalTotal) * 100) : 0,
    [originalTotal, discountTotal]
  );

  const total = useMemo(
    () =>
      currency === "USD"
        ? `$${subtotal.toFixed(2)}`
        : `₹${Math.round(subtotal * conversionRate).toLocaleString()}`,
    [subtotal, currency]
  );

  const formattedDiscount = useMemo(
    () =>
      currency === "USD"
        ? `$${discountTotal.toFixed(2)}`
        : `₹${Math.round(discountTotal * conversionRate).toLocaleString()}`,
    [discountTotal, currency]
  );

  const handleRemove = useCallback(
    (item) => {
      const index = cart.findIndex((cartItem) => cartItem.name === item.name);
      setRecentlyRemoved({ item, index });
      removeFromCart(item.name);

      const timeout = setTimeout(() => setRecentlyRemoved(null), 5000);
      setUndoTimeout(timeout);
    },
    [cart, removeFromCart]
  );

  const handleUndo = useCallback(() => {
    clearTimeout(undoTimeout);
    if (recentlyRemoved) {
      addToCartAtIndex(recentlyRemoved.item, recentlyRemoved.index);
      setRecentlyRemoved(null);
    }
  }, [undoTimeout, recentlyRemoved, addToCartAtIndex]);

  const handleIncreaseQuantity = useCallback(
    (item) => {
      const updated = cart.map((product) =>
        product.name === item.name
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCart(updated);
    },
    [cart, setCart]
  );

  const handleDecreaseQuantity = useCallback(
    (item) => {
      const updated = cart.map((product) =>
        product.name === item.name
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product
      );
      setCart(updated);
    },
    [cart, setCart]
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4 sm:p-6">
      {/* Undo Toast */}
      <AnimatePresence>
        {recentlyRemoved && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                 bg-white dark:bg-gray-800 px-4 sm:px-6 py-3 rounded 
                 shadow-lg border border-gray-300 dark:border-gray-600 
                 z-50 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 
                 max-w-[90%] sm:max-w-fit text-center sm:text-left"
          >
            <p className="text-sm text-gray-800 dark:text-gray-200 ">
              <span className="font-bold text-base capitalize">
                {t(recentlyRemoved.item.category).toLowerCase()}
              </span>{" "}
              {t("cart.itemRemoved")}
            </p>
            <button
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
              onClick={handleUndo}
            >
              {t("cart.undo")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">
            {t("cart.cart")}
          </h1>

          {cart.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">
              {t("cart.noCartItem")}
            </p>
          ) : (
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    x: 200,
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-transparent border border-gray-300 dark:border-gray-500 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md dark:shadow-gray-500 cursor-pointer"
                  onClick={() => handleCardClick(item)}
                >
                  <div className="flex items-start gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={t(item.name)}
                      className="w-24 h-24 object-contain rounded"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                        {t(item.name)}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-100 text-sm">
                        {t(item.category)}
                      </p>
                      <p className="text-green-500 font-bold mt-1">
                        {getPrice(item.price)}
                        <span className="text-gray-400 line-through text-sm ml-2">
                          {getPrice(item.originalPrice)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-4 mt-2 sm:mt-0 cursor-default"
                  >
                    {/* Quantity Controls */}
                    <div className="flex gap-3 border border-gray-200 dark:border-gray-700 p-1 rounded-full">
                      {/* Conditional: Trash if quantity === 1 */}
                      {item.quantity === 1 ? (
                        <button
                          onClick={() => handleRemove(item)}
                          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-red-500 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDecreaseQuantity(item)}
                          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
                        >
                          <Minus size={18} />
                        </button>
                      )}

                      <span className="font-semibold text-gray-800 dark:text-gray-200 cursor-text">
                        {item.quantity ?? 1}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Summary Card */}
        {cart.length > 0 && (
          <div className="lg:sticky lg:top-6 h-fit bg-white dark:bg-gray-800 border border-white dark:border-gray-600 p-6 rounded-xl shadow mt-12">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("cart.summary")}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">
              {t("cart.subtotal")} ({cart.length} {t("cart.items")}):{" "}
              <span className="font-bold">{total}</span>
            </p>
            <p className="text-green-600 text-sm font-semibold mt-1">
              <span className="text-gray-600 dark:text-gray-300">
                {t("cart.youSaved")}:
              </span>{" "}
              {formattedDiscount} ({discountPercentage}%)
            </p>

            <label className="flex items-center text-sm text-gray-600 dark:text-gray-200 mt-2 accent-pink-400">
              <input type="checkbox" className="mr-2 cursor-pointer" />
              {t("cart.giftOption")}
            </label>

            <Button className="mt-6 py-2 px-4 rounded w-full bg-pink-500 hover:bg-pink-600 cursor-pointer">
              {t("cart.proceedToBuy")}
            </Button>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 border-t pt-2 text-left">
              <p>
                <Trans i18nKey="cart.securePayment">
                  <strong>100% Secure Payments:</strong> <br /> All major cards
                  and UPI supported.
                </Trans>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
