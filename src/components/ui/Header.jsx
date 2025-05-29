import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Search,
  CircleUser,
  Heart,
  ShoppingCart,
  Menu,
  Home,
  Grid,
  X,
} from "lucide-react";
import AuthModal from "../Auth/AuthModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "/src/firebase.js";
import DarkModeToggle from "./DarkModeToggle";
import logo from "../../assets/logo.png";
// Icons imports:
import pc from "../../icons/pc.png";
import airFreshner from "../../icons/air-freshner.png";
import blazer from "../../icons/blazer.png";
import bracelet from "../../icons/bracelet.png";
import cap from "../../icons/cap.png";
import keyboard from "../../icons/computer-keyboard.png";
import mouse from "../../icons/computer-mouse.png";
import cosmetics from "../../icons/cosmetics.png";
import poloShirt from "../../icons/cotton-polo-shirt.png";
import deodorant from "../../icons/deodorant.png";
import dress from "../../icons/dress.png";
import dslr from "../../icons/dslr-camera.png";
import earings from "../../icons/earings.png";
import handbag from "../../icons/handbag.png";
import headphones from "../../icons/headphones.png";
import heals from "../../icons/heals.png";
import jacket from "../../icons/jacket.png";
import jeans from "../../icons/jeans.png";
import laptop from "../../icons/laptop-screen.png";
import microphone from "../../icons/microphone.png";
import necklace from "../../icons/necklace.png";
import bodyPerfume from "../../icons/perfume-bottle.png";
import perfume from "../../icons/perfume.png";
import ring from "../../icons/ring.png";
import shorts from "../../icons/shorts.png";
import smartTv from "../../icons/smart-tv.png";
import smartwatch from "../../icons/smartwatch.png";
import sneakers from "../../icons/sneakers.png";
import sports from "../../icons/sports.png";
import spray from "../../icons/spray.png";
import sunglasses from "../../icons/sunglasses.png";
import tablet from "../../icons/tablet.png";

const Header = ({ currency, setCurrency }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const inputRef = useRef();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Firebase User:", user); // <-- Check this in console
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/products");
    }
  };

  return (
    <header>
      {/* Header Top */}
      <div className="bg-gray-100 py-2 dark:bg-black">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
          {/* Social Icons */}
          <ul className="flex justify-center sm:justify-start space-x-2">
            {[
              {
                href: "#",
                icon: Facebook,
                label: "Facebook",
                hoverColor: "group-hover:text-[#1877F2]",
              },
              {
                href: "https://x.com/ShivamGupt97925",
                icon: Twitter,
                label: "Twitter",
                hoverColor: "group-hover:text-[#1DA1F2]",
              },
              {
                href: "https://www.instagram.com/__shiiivammm__/",
                icon: Instagram,
                label: "Instagram",
                hoverColor: "group-hover:text-[#E1306C]",
              },
              {
                href: "https://www.linkedin.com/in/the-shivam-gupta/",
                icon: Linkedin,
                label: "LinkedIn",
                hoverColor: "group-hover:text-[#0077B5]",
              },
            ].map((item, idx) => (
              <li
                key={idx}
                className="group p-2 border rounded-lg transition-all duration-300 
            bg-gray-100 dark:bg-gray-800 
            border-gray-300 dark:border-gray-700 
            hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`text-gray-600 dark:text-gray-300 transition-colors duration-300 ${item.hoverColor}`}
                >
                  <item.icon size={20} />
                </a>
              </li>
            ))}
          </ul>

          {/* Free Shipping Message */}
          <div className="text-center sm:text-left text-sm text-gray-700 dark:text-gray-300 uppercase">
            <span className="font-semibold text-gray-600 dark:text-gray-200">
              {t("header.freeShipping")}
            </span>{" "}
            {currency === "USD"
              ? t("header.Order Over - $40")
              : t("header.Order Over - ₹3320")}
          </div>

          {/* Currency / Language / Theme Toggle */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-2 text-gray-500 dark:text-gray-200">
            <select
              className="px-2 py-1 text-sm cursor-pointer dark:bg-gray-800 bg-gray-200 rounded-sm"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD $</option>
              <option value="INR">INR ₹</option>
            </select>

            <select
              onChange={handleLanguageChange}
              className="px-2 py-1 text-sm uppercase cursor-pointer dark:bg-gray-800 bg-gray-200 rounded-sm"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>

            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Header Main */}
      <div className="py-4 border-t border-b border-gray-200 dark:border-gray-700 dark:bg-black">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="w-20 sm:w-24 h-auto rounded-full"
            />
          </Link>

          {/* Search Box */}
          <div className="relative lg:w-full md:max-w-md sm:max-w-sm">
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              type="search"
              placeholder={t("header.searchPlaceholder")}
              className="w-full border border-gray-300 dark:border-pink-500 dark:text-gray-50 bg-transparent rounded-full px-4 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 caret-pink-500
          [&::-webkit-search-cancel-button]:appearance-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="submit"
              onClick={handleSearch}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-600 cursor-pointer"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div ref={dropdownRef} className="relative user-dropdown">
                <img
                  src={user.photoURL || "/src/assets/default-avatar.jpeg"}
                  loading="lazy"
                  alt="Profile"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full border-2 border-pink-400 cursor-pointer hover:ring-2 hover:ring-pink-300 transition"
                />

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-center p-4 z-50"
                    >
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 transform rotate-45 border-l border-t border-gray-200 dark:border-gray-700 z-0" />

                      {/* Content */}
                      <p className="font-semibold text-gray-800 dark:text-gray-100 break-words text-sm">
                        {user.displayName || user.email}
                      </p>

                      <button
                        onClick={() => {
                          signOut(auth);
                          setDropdownOpen(false);
                        }}
                        className="mt-3 w-full py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition cursor-pointer"
              >
                <CircleUser size={32} />
              </button>
            )}

            <button
              onClick={() => navigate("/favorites")}
              className="relative text-gray-600 dark:text-gray-300 cursor-pointer"
            >
              <Heart size={32} />
              <span className="absolute -top-1 -right-2 text-xs bg-pink-500 text-white rounded-full px-1 font-bold">
                {favorites.length}
              </span>
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="relative text-gray-600 dark:text-gray-300 cursor-pointer"
            >
              <ShoppingCart size={32} />
              <span className="absolute -top-1 -right-2 text-xs bg-pink-500 text-white rounded-full px-1 font-bold">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b border-gray-200 dark:border-gray-700 dark:bg-black">
        <div className="flex items-center justify-center container mx-auto">
          <ul className="flex space-x-8 py-4 text-lg font-bold text-gray-600 dark:text-gray-300">
            <li className="relative group">
              <a
                onClick={() => navigate("/")}
                className="hover:text-pink-500 ease-in-out duration-200 cursor-pointer"
              >
                {t("header.home")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
            </li>
            <li className="relative group">
              <a className="hover:text-pink-500 ease-in-out duration-200 cursor-pointer">
                {t("header.categories")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/4 w-max p-8 bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {/* Single Category Block */}
                  {[
                    {
                      title: t("dropdown.gadgets"),
                      items: [
                        { icon: pc, label: t("dropdown.desktop") },
                        { icon: laptop, label: t("dropdown.laptop") },
                        { icon: dslr, label: t("dropdown.camera") },
                        { icon: tablet, label: t("dropdown.tablet") },
                        { icon: headphones, label: t("dropdown.headphone") },
                      ],
                    },
                    {
                      title: t("dropdown.mens"),
                      items: [
                        { icon: blazer, label: t("dropdown.formal") },
                        { icon: jeans, label: t("dropdown.casual") },
                        { icon: sports, label: t("dropdown.sports") },
                        { icon: jacket, label: t("dropdown.jacket") },
                        { icon: sunglasses, label: t("dropdown.sunglasses") },
                      ],
                    },
                    {
                      title: t("dropdown.women"),
                      items: [
                        { icon: dress, label: t("dropdown.dressAndFrock") },
                        { icon: necklace, label: t("dropdown.necklace") },
                        { icon: perfume, label: t("dropdown.perfume") },
                        { icon: cosmetics, label: t("dropdown.cosmetics") },
                        { icon: handbag, label: t("dropdown.bags") },
                      ],
                    },
                    {
                      title: t("dropdown.electronics"),
                      items: [
                        { icon: smartwatch, label: t("dropdown.smartWatch") },
                        { icon: smartTv, label: t("dropdown.smartTV") },
                        { icon: keyboard, label: t("dropdown.keyboard") },
                        { icon: mouse, label: t("dropdown.mouse") },
                        { icon: microphone, label: t("dropdown.microphone") },
                      ],
                    },
                  ].map((category, index) => (
                    <div key={index} className="min-w-[12rem]">
                      <h3 className="font-bold mb-3 text-lg">
                        {category.title}
                      </h3>
                      <div className="h-[1px] bg-gray-200 dark:bg-gray-400 mb-4" />
                      <ul className="space-y-3 text-gray-500 text-base font-medium">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-center">
                            <div className="flex items-center gap-3 flex-row-reverse">
                              <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300 peer">
                                {item.label}
                              </a>
                              <img
                                src={item.icon}
                                width={26}
                                alt=""
                                className="transform scale-90 translate-y-1 opacity-70 transition-all duration-300 
                 peer-hover:scale-100 peer-hover:translate-y-0 peer-hover:opacity-100 dark:invert"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            {/* Men */}
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.men")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/2 min-w-[12em] max-w-[16em] min-h-[10em] p-4 bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      {[
                        { icon: smartwatch, label: t("dropdown.watch") },
                        { icon: cap, label: t("dropdown.caps") },
                        {
                          icon: poloShirt,
                          label: t("dropdown.shirtAndTshirt"),
                        },
                        { icon: sneakers, label: t("dropdown.shoes") },
                        { icon: shorts, label: t("dropdown.shortAndJeans") },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300 peer">
                              {item.label}
                            </a>
                            <img
                              src={item.icon}
                              width={26}
                              alt=""
                              className="transform scale-90 translate-y-1 opacity-70 transition-all duration-300 
                 peer-hover:scale-100 peer-hover:translate-y-0 peer-hover:opacity-100 dark:invert"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* WOMEN */}
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.women")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/2 min-w-[12em] max-w-[16em] min-h-[10em] p-4 bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      {[
                        { icon: necklace, label: t("dropdown.necklace") },
                        { icon: handbag, label: t("dropdown.bags") },
                        { icon: dress, label: t("dropdown.dressAndFrock") },
                        { icon: bracelet, label: t("dropdown.bracelet") },
                        { icon: heals, label: t("dropdown.heals") },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300 peer">
                              {item.label}
                            </a>
                            <img
                              src={item.icon}
                              width={26}
                              alt=""
                              className="transform scale-90 translate-y-1 opacity-70 transition-all duration-300 
                 peer-hover:scale-100 peer-hover:translate-y-0 peer-hover:opacity-100 dark:invert"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* JEWELRY */}
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.jewelry")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/2 min-w-[12em] max-w-[16em] min-h-[10em] p-4 bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      {[
                        { icon: necklace, label: t("dropdown.necklace") },
                        { icon: earings, label: t("dropdown.earings") },
                        { icon: bracelet, label: t("dropdown.bracelet") },
                        { icon: ring, label: t("dropdown.rings") },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300 peer">
                              {item.label}
                            </a>
                            <img
                              src={item.icon}
                              width={26}
                              alt=""
                              className="transform scale-90 translate-y-1 opacity-70 transition-all duration-300 
                 peer-hover:scale-100 peer-hover:translate-y-0 peer-hover:opacity-100 dark:invert"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* PERFUME */}
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.perfume")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/2 min-w-[12em] max-w-[16em] min-h-[10em] p-4 bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      {[
                        { icon: deodorant, label: t("dropdown.deodorant") },
                        { icon: airFreshner, label: t("dropdown.airFreshner") },
                        { icon: bodyPerfume, label: t("dropdown.bodyPerfume") },
                        { icon: spray, label: t("dropdown.clothesPerfume") },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300 peer">
                              {item.label}
                            </a>
                            <img
                              src={item.icon}
                              width={26}
                              alt=""
                              className="transform scale-90 translate-y-1 opacity-70 transition-all duration-300 
                 peer-hover:scale-100 peer-hover:translate-y-0 peer-hover:opacity-100 dark:invert"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* HotOffers */}
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.hotOffers")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white border-t p-2 md:hidden z-10">
        <button>
          <Menu size={24} />
        </button>
        <button className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
            {cart.length}
          </span>
        </button>
        <button>
          <Home size={24} />
        </button>
        <button className="relative">
          <Heart size={24} />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
            0
          </span>
        </button>
        <button>
          <Grid size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
