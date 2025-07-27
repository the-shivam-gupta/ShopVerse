import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CheckoutStepIndicator from "./CheckoutStepIndicator";
import { useCart } from "../context/CartContext";
import { Input } from "./Input";
import { Button } from "./Button";
import { Trans, useTranslation } from "react-i18next";
import paypal from "../../assets/paypal.png";
import mastercard from "../../assets/masterCard.png";
import visa from "../../assets/visa.png";

const CheckoutDetails = ({ currency }) => {
  const { t } = useTranslation();
  const { cart = [] } = useCart();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("none");

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    card: "",
    month: "",
    cvc: "",
  });

  const handleCardClick = (product) => {
    const trimmedCategory = product.category.replace(/^card\./, "");
    const trimmedName = product.name.replace(/^card\./, "");
    const encodedCategory = encodeURIComponent(trimmedCategory);
    const encodedName = encodeURIComponent(trimmedName);
    navigate(`/product/${encodedCategory}/${encodedName}`);
  };

  const isFormValid = () => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.country.trim() &&
      form.address.trim() &&
      form.city.trim() &&
      form.zip.trim() &&
      form.state.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      (selectedMethod !== "credit" || (form.card && form.month && form.cvc))
    );
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 text-gray-800 dark:text-gray-100 pb-12">
      <CheckoutStepIndicator currentStep={2} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Billing Info */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-bold text-pink-500 mb-4">
            Billing Information
          </h2>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              <Input
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
            <Input
              label="Country"
              name="country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
            <Input
              label="Street Address"
              name="streetAddress"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              label="Zip / Postal Code"
              name="zip"
              type="number"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
            />
            <Input
              label="State / Province"
              name="state"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <Input
              label="Phone Number"
              name="state"
              type="number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              label="Email Address"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="space-y-2 pt-2 text-sm text-gray-700 dark:text-gray-300">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-pink-500" />
                <span>Residential Address</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-pink-500" />
                <span>Create an account</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-pink-500" />
                <span>I agree to receive products containing THC</span>
              </label>
            </div>
          </form>
        </motion.div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-6 h-fit bg-white dark:bg-gray-800 dark:border dark:border-gray-800 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-lg font-bold text-pink-500 mb-4">
              {t("cart.summary")}
            </h2>

            {/* Product Thumbnails with quantity badge */}
            <div className="flex flex-wrap gap-4 mb-4">
              {cart.map((item, index) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(item)}
                  key={index}
                  className="relative w-16 h-16 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full p-1 object-contain border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-white"
                  />
                  {item.quantity > 1 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                      {item.quantity}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

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
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
              Shipping:{" "}
              <span className="text-black dark:text-white font-semibold">
                Free
              </span>
            </p>

            <div className="bg-white dark:bg-gray-800 mt-4 rounded-md w-full max-w-lg">
              <label className="font-medium text-gray-800 dark:text-gray-200 mb-2 block">
                Payment Method
              </label>

              {/* Payment Logos */}
              <div className="flex items-center gap-2 flex-wrap mt-2">
                {["credit", "paypal"].map((method, index) => (
                  <button
                    key={method}
                    onClick={() => handleSelect(method)}
                    className={`w-24 h-10 bg-white border rounded-md flex items-center justify-center gap-2 px-2 py-1 transition cursor-pointer ${
                      selectedMethod === method
                        ? "border-pink-500 ring-2 ring-pink-300"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {method === "credit" ? (
                      <>
                        <img src={visa} alt="Visa" className="h-4" />
                        <img
                          src={mastercard}
                          alt="Mastercard"
                          className="h-4"
                        />
                      </>
                    ) : (
                      <img src={paypal} alt="PayPal" className="h-5" />
                    )}
                  </button>
                ))}
              </div>

              {/* Credit Card Fields */}
              {selectedMethod === "credit" && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pay with your credit card via Authorize.Net.
                  </p>

                  <Input
                    label="Card Number *"
                    name="cardNumber"
                    type="number"
                    value={form.card}
                    onChange={(e) => setForm({ ...form, card: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  />

                  <div className="flex gap-2">
                    <Input
                      label="MM / YY *"
                      name="month"
                      type="number"
                      value={form.month}
                      onChange={(e) =>
                        setForm({ ...form, month: e.target.value })
                      }
                      className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                    />
                    <Input
                      label="CVC *"
                      name="cvc"
                      type="number"
                      value={form.cvc}
                      onChange={(e) =>
                        setForm({ ...form, cvc: e.target.value })
                      }
                      className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              className={`mt-6 py-2 px-4 rounded w-full text-white font-semibold transition ${
                isFormValid()
                  ? "bg-pink-500 hover:bg-pink-600 cursor-pointer"
                  : "bg-gray-400 opacity-60 cursor-not-allowed"
              }`}
              disabled={!isFormValid()}
            >
              {t("cart.proceedToBuy")}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
