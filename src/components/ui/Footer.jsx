import { footer } from "framer-motion/client";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-gray-300 py-10 text-lg">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* LOGO */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="./src/assets/logo.png"
              alt="Logo"
              className="w-42 h-auto rounded-full cursor-pointer"
            />
          </Link>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 relative">
            {t("footer.popularCategories")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 text-gray-400 text-xl">
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.fashion")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.electronic")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.cosmetic")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.health")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.watches")}
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 relative">
            {t("footer.products")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 text-gray-400 text-xl">
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.pricesDrop")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
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
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.sitemap")}
            </li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 relative">
            {t("footer.ourCompany")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 text-gray-400 text-xl">
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
          <h3 className="text-white text-lg font-bold mb-4 relative">
            {t("footer.products")}
            <span className="block w-10 h-0.5 bg-pink-500 mt-1"></span>
          </h3>
          <ul className="space-y-2 text-gray-400 text-xl">
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.pricesDrop")}
            </li>
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
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
            <li className="hover:text-pink-400 duration-200 ease-in-out cursor-pointer">
              {t("footer.sitemap")}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
