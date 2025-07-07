import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import razorpay from "../../assets/razorpay.png";
import paypal from "../../assets/paypal.png";
import mastercard from "../../assets/masterCard.png";
import sslsecure from "../../assets/SSL_secure.jpeg";
import visa from "../../assets/visa.png";
import React, { useState } from "react";
// icons
import shirtsIcon from "../../icons/polo-shirt.png";
import accessoriesIcon from "../../icons/ring.png";
import electronicsIcon from "../../icons/laptop-screen.png";
import bottomsIcon from "../../icons/jeans.png";
import outerwearIcon from "../../icons/jacket.png";
import footwearIcon from "../../icons/sneakers.png";
import bagsIcon from "../../icons/handbag.png";
import beautyIcon from "../../icons/cosmetics.png";
import { Button } from "./Button";
import { motion } from "framer-motion";
import NewsletterSection from "./Newsletter";

const categoryIcons = {
  SHIRTS: shirtsIcon,
  ACCESSORIES: accessoriesIcon,
  ELECTRONICS: electronicsIcon,
  BOTTOMS: bottomsIcon,
  OUTERWEAR: outerwearIcon,
  FOOTWEAR: footwearIcon,
  BAGS: bagsIcon,
  BEAUTY: beautyIcon,
};

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

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState({ email: false });
  const [subscribed, setSubscribed] = useState(false);

  const floatingStyle = (field) => {
    return focus[field] || email.length > 0;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-gray-200 dark:bg-gray-800 border-t dark:border-gray-700 text-gray-300 py-6 text-base sm:text-lg">
      {/* Brand Directory */}
      <div className="w-full mt-8 py-4 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* CATEGORY DIRECTORY */}
        <div className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto text-left">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 uppercase">
              Category Directory
            </h2>
            <div className="space-y-3">
              {Object.entries(categoryStructure).map(([mainCat, subcats]) => (
                <div
                  key={mainCat}
                  className="flex flex-wrap items-start gap-y-2 mb-2"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-3 group">
                      <img
                        src={categoryIcons[mainCat]}
                        alt={mainCat}
                        className="w-5 h-5 object-contain transform scale-90 translate-y-1 opacity-70 transition-all duration-300 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 dark:invert"
                      />
                      <div className="relative">
                        <h4
                          onClick={() =>
                            navigate(
                              `/products/category/${mainCat.toUpperCase()}`
                            )
                          }
                          className="text-gray-500 dark:text-gray-200 text-base font-bold tracking-wide uppercase whitespace-nowrap cursor-pointer"
                        >
                          {mainCat.replace("_", " ")} :
                          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-wrap text-gray-500 dark:text-gray-300 gap-x-2 text-sm sm:text-base font-medium">
                      {subcats.map((sub, idx) => (
                        <React.Fragment key={sub}>
                          <span
                            onClick={() =>
                              navigate(
                                `/products/category/${sub.toUpperCase()}`
                              )
                            }
                            className="hover:text-pink-500 cursor-pointer transition-all"
                          >
                            {sub
                              .toLowerCase()
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </span>
                          {idx !== subcats.length - 1 && (
                            <span className="mx-px text-gray-400 select-none">
                              |
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <NewsletterSection />
      </div>
      <div className="h-px bg-gradient-to-r from-transparent dark:via-gray-500 via-gray-600 to-transparent my-6 sm:my-1" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-8 mt-6">
        {/* LOGO */}
        <div className="flex items-center justify-center w-full md:w-auto">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-32 sm:w-36 h-auto rounded-full cursor-pointer dark:invert scale-135"
            />
          </Link>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-base sm:text-lg font-bold mb-4 relative">
            {t("footer.popularCategories")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 font-medium">
            <li
              onClick={() => navigate("/products")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.fashion")}
            </li>
            <li
              onClick={() => navigate("/products/category/ELECTRONICS")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.electronic")}
            </li>
            <li
              onClick={() => navigate("/products/category/BEAUTY")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.cosmetic")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.health")}
            </li>
            <li
              onClick={() => navigate("/products/category/WATCH")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.watches")}
            </li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-base sm:text-lg font-bold mb-4 relative">
            {t("footer.services")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 font-medium">
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.helpCenter")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.trackOrder")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.Return&Exchange")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.shipping")}
            </li>
            <li
              onClick={() => navigate("/faqs")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.faqs")}
            </li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-base sm:text-lg font-bold mb-4 relative">
            {t("footer.ourCompany")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 font-medium">
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.delivery")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.legalNotice")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.termsConditions")}
            </li>
            <li
              onClick={() => navigate("/about")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.aboutUs")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.securePayment")}
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-base sm:text-lg font-bold mb-4 relative">
            {t("footer.products")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 font-medium">
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.pricesDrop")}
            </li>
            <li
              onClick={() => navigate("/products/category/new")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.newProducts")}
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition-all">
              {t("footer.bestSales")}
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.contactUs")}
            </li>
            <li
              onClick={() => navigate("/sitemap")}
              className="hover:text-pink-400 cursor-pointer transition-all"
            >
              {t("footer.sitemap")}
            </li>
          </ul>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent dark:via-gray-500 via-gray-600 to-transparent my-6" />

      {/* Trust Badges Section */}
      <div className="mt-10 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {[razorpay, sslsecure, visa, mastercard, paypal].map(
            (logo, index) => (
              <div
                key={index}
                className="w-16 h-8 bg-white rounded-md shadow-md flex items-center justify-center p-1"
              >
                <img
                  src={logo}
                  alt="Payment Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )
          )}
        </div>
        <div className="w-full text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base font-semibold px-4">
          <span className="inline-flex flex-wrap items-center justify-center gap-1 text-center">
            &copy; <strong className="font-semibold">Shopverse</strong>.{" "}
            {t("footer.allRightsReserved")}
          </span>
        </div>
      </div>
    </footer>
  );
}
