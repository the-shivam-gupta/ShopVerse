import { Link } from "react-router-dom";
import {
  Home,
  Info,
  Phone,
  HelpCircle,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import shirtIcon from "../../icons/cotton-polo-shirt.png";
import electronicsIcon from "../../icons/pc.png";
import footwearIcon from "../../icons/sneakers.png";
import bagsIcon from "../../icons/handbag.png";
import accessoriesIcon from "../../icons/bracelet.png";
import bottomsIcon from "../../icons/jeans.png";
import outerwearIcon from "../../icons/jacket.png";
import beautyIcon from "../../icons/perfume.png";

export default function Sitemap() {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const linkStyle =
    "text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-all";

  const sectionTitle =
    "text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2 border-gray-300 dark:border-gray-700";

  const iconStyle =
    "w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transform scale-90 dark:text-gray-400 translate-y-1 transition-all duration-300 group-hover:scale-100 group-hover:translate-y-0";

  const shopLinks = [
    {
      to: "/products/category/SHIRTS",
      label: "Shirts",
      icon: (
        <img
          src={shirtIcon}
          alt="Shirts"
          className={`${iconStyle} dark:invert`}
        />
      ),
    },
    {
      to: "/products/category/ELECTRONICS",
      label: "Electronics",
      icon: (
        <img
          src={electronicsIcon}
          alt="Electronics"
          className={`${iconStyle} dark:invert`}
        />
      ),
    },
    {
      to: "/products/category/FOOTWEAR",
      label: "Footwear",
      icon: (
        <img
          src={footwearIcon}
          alt="Footwear"
          className={`${iconStyle} dark:invert`}
        />
      ),
    },
    {
      to: "/products/category/BAGS",
      label: "Bags",
      icon: (
        <img src={bagsIcon} alt="Bags" className={`${iconStyle} dark:invert`} />
      ),
    },
    {
      to: "/products/category/ACCESSORIES",
      label: "Accessories",
      icon: (
        <img
          src={accessoriesIcon}
          alt="Accessories"
          className={`${iconStyle} dark:invert`}
        />
      ),
    },
    {
      to: "/products/category/BOTTOMS",
      label: "Bottoms",
      icon: (
        <img
          src={bottomsIcon}
          alt="Bottoms"
          className={`${iconStyle} dark:invert`}
        />
      ),
    },
    {
      to: "/products/category/OUTERWEAR",
      label: "Outerwear",
      icon: (
        <img
          src={outerwearIcon}
          alt="Outerwear"
          className={`${iconStyle} dark:invert`}
        />
      ),
    },
    {
      to: "/products/category/BEAUTY",
      label: "Beauty",
      icon: (
        <img
          src={beautyIcon}
          alt="Beauty"
          className={`${iconStyle} dark:invert`}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen py-16 px-6 md:px-10 bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold text-center text-pink-500 mb-12">
        Sitemap
      </h1>
      <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-6 sm:my-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* General */}
        <div>
          <h2 className={sectionTitle}>General</h2>
          <ul className="space-y-1">
            <li className="text-base sm:text-lg">
              <Link to="/" className="group inline-flex gap-2">
                <Home className={iconStyle} />
                <span className={linkStyle}>Home</span>
              </Link>
            </li>
            <li className="text-base sm:text-lg">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2"
              >
                <Info className={iconStyle} />
                <span className={linkStyle}>About Us</span>
              </Link>
            </li>
            <li className="text-base sm:text-lg">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2"
              >
                <Phone className={iconStyle} />
                <span className={linkStyle}>Contact Us</span>
              </Link>
            </li>
            <li className="text-base sm:text-lg">
              <Link to="/faqs" className="group inline-flex items-center gap-2">
                <HelpCircle className={iconStyle} />
                <span className={linkStyle}>FAQs</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop  2-column layout inside one section */}
        <div>
          <h2 className={sectionTitle}>Shop</h2>
          <div className="grid grid-cols-2 gap-x-4 space-y-2">
            {shopLinks.map(({ to, label, icon }) => (
              <li className="list-none" key={to}>
                <Link to={to} className="group inline-flex gap-2 items-center">
                  {icon}
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-pink-500 transition-all">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>

        {/* Your Activity */}
        <div>
          <h2 className={sectionTitle}>Your Activity</h2>
          <ul className="space-y-1">
            <li className="text-base sm:text-lg">
              <Link
                to="/favorites"
                className="group inline-flex items-center gap-2"
              >
                <div className="relative transform scale-90 translate-y-1 transition-transform duration-300 group-hover:scale-100 group-hover:translate-y-0">
                  <Heart className={iconStyle} />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[10px] px-1.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className={linkStyle}>Favorites</span>
              </Link>
            </li>

            <li className="text-base sm:text-lg">
              <Link to="/cart" className="group inline-flex items-center gap-2">
                <div className="relative transform scale-90 translate-y-1 transition-transform duration-300 group-hover:scale-100 group-hover:translate-y-0">
                  <ShoppingCart className={iconStyle} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[10px] px-1.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </div>
                <span className={linkStyle}>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
