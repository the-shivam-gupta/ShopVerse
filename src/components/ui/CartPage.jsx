import React from "react";
import { useCart } from "../context/CartContext";
import { Trans, useTranslation } from "react-i18next";
import { Shield, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = ({ currency }) => {
  const { cart = [], removeFromCart } = useCart();
  const { t } = useTranslation();

  const conversionRate = 83;
  const getPrice = (price) =>
    currency === "USD" ? `$${price}` : `₹${Math.round(price * conversionRate)}`;

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
  const discountTotal = originalTotal - subtotal;

  const discountPercentage =
    originalTotal > 0 ? Math.round((discountTotal / originalTotal) * 100) : 0;

  const total =
    currency === "USD"
      ? `$${subtotal.toFixed(2)}`
      : `₹${Math.round(subtotal * conversionRate).toLocaleString()}`;

  const formattedOriginalTotal =
    currency === "USD"
      ? `$${originalTotal.toFixed(2)}`
      : `₹${Math.round(originalTotal * conversionRate).toLocaleString()}`;

  const formattedDiscount =
    currency === "USD"
      ? `$${discountTotal.toFixed(2)}`
      : `₹${Math.round(discountTotal * conversionRate).toLocaleString()}`;

  // No Items in cart
  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">
          {t("cart.cart")}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          {t("cart.noCartItem")}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">
            {t("cart.cart")}
          </h1>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  x: 200,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow"
              >
                <div className="flex items-start gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {t(item.name)}
                    </h2>
                    <p className="text-gray-500 text-sm">{t(item.category)}</p>
                    <p className="text-gray-700 font-bold mt-1">
                      {getPrice(item.price)}
                      <span className="text-gray-400 line-through text-sm ml-2">
                        {getPrice(item.originalPrice)}
                      </span>
                    </p>
                  </div>
                </div>
                <Trash2
                  size={25}
                  className="text-red-500 hover:text-red-700 cursor-pointer self-end sm:self-auto"
                  onClick={() => removeFromCart(item.name)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Card */}
        <div className="lg:sticky lg:top-6 h-fit bg-white dark:bg-gray-800 border border-white dark:border-gray-600 p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t("cart.summary")}
          </h2>
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">
            {t("cart.subtotal")} ({cart.length} {t("cart.items")}):{" "}
            <span className="font-bold">{total}</span>
          </p>
          <p className="text-green-600 text-sm font-semibold mt-1">
            <span className="text-gray-600 dark:text-gray-300">{t("cart.youSaved")}:</span>{" "}
            {formattedDiscount} ({discountPercentage}%)
          </p>

          <label className="flex items-center text-sm text-gray-600 dark:text-gray-200 mt-2 accent-pink-400">
            <input type="checkbox" className="mr-2 cursor-pointer" />
            {t("cart.giftOption")}
          </label>

          <button className="mt-6 bg-pink-400 hover:bg-pink-500 text-black dark:text-white font-semibold py-2 px-4 rounded w-full cursor-pointer duration-150 ease-linear">
            {t("cart.proceedToBuy")}
          </button>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 border-t pt-2 text-left">
            <p>
              <Trans i18nKey="cart.securePayment">
                <strong>100% Secure Payments:</strong> <br /> All major cards
                and UPI supported.
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
