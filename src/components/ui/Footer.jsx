import { footer } from "framer-motion/client";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import razorpay from "../../assets/razorpay.png";
import paypal from "../../assets/paypal.png";
import mastercard from "../../assets/masterCard.png";
import sslsecure from "../../assets/SSL_secure.jpeg";
import visa from "../../assets/visa.png";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="relative bg-gray-200 dark:bg-gray-800 border-t dark:border-gray-700 text-gray-300 py-6 text-lg">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* LOGO */}
        <div className="flex items-center justify-center w-25 sm:w-30 md:w-34 xl:w-42 m-auto">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-42 h-auto rounded-full cursor-pointer dark:invert scale-125"
            />
          </Link>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-lg font-bold mb-4 relative">
            {t("footer.popularCategories")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 sm:text-balance text-lg font-medium">
            <li
              onClick={() => navigate("/products")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.fashion")}
            </li>
            <li
              onClick={() => navigate("/products/category/ELECTRONICS")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.electronic")}
            </li>
            <li
              onClick={() => navigate("/products/category/BEAUTY")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.cosmetic")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.health")}
            </li>
            <li
              onClick={() => navigate("/products/category/WATCH")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.watches")}
            </li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-lg font-bold mb-4 relative">
            {t("footer.services")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 sm:text-balance text-lg font-medium">
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.helpCenter")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.trackOrder")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.Return&Exchange")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.shipping")}
            </li>
            <li
              onClick={() => navigate("/faqs")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.faqs")}
            </li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-lg font-bold mb-4 relative">
            {t("footer.ourCompany")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 sm:text-balance text-lg font-medium">
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.delivery")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.legalNotice")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.termsConditions")}
            </li>
            <li
              onClick={() => navigate("/about")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.aboutUs")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.securePayment")}
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="dark:text-white text-gray-700 text-lg font-bold mb-4 relative">
            {t("footer.products")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 dark:text-gray-400 text-gray-500/90 sm:text-balance text-lg font-medium">
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.pricesDrop")}
            </li>
            <li
              onClick={() => navigate("/products/category/new")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.newProducts")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.bestSales")}
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.contactUs")}
            </li>
            <li
              onClick={() => navigate("/sitemap")}
              className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer"
            >
              {t("footer.sitemap")}
            </li>
          </ul>
        </div>
      </div>
      {/* Trust Badges Section */}
      <div className="mt-10 border-t dark:border-gray-500 border-gray-400 pt-4 px-4 max-w-7xl mx-auto flex flex-col items-center gap-4">
        {/* Logos */}
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

        {/* Copyright */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg font-semibold">
          <span className="inline-flex items-center gap-1">
            &copy; <strong className="font-semibold">Shopverse</strong>.{" "}
            {t("footer.allRightsReserved")}
          </span>
        </div>
      </div>
    </footer>
  );
}
