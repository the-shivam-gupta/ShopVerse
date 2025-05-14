import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
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
} from "lucide-react";
import AuthModal from "../Auth/AuthModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "/src/firebase.js";

const Header = ({ currency, setCurrency }) => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
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

  return (
    <header>
      {/* Header Top */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center sm:justify-between justify-center">
          <ul className="flex items-center justify-center space-x-2">
            <li className="p-2 border border-gray-400 bg-gray-200 rounded-lg">
              <a href="#" className="text-gray-600">
                <Facebook size={20} />
              </a>
            </li>
            <li className="p-2 border border-gray-400 bg-gray-200 rounded-lg">
              <a
                href="https://x.com/ShivamGupt97925"
                target="_blank"
                className="text-gray-600"
              >
                <Twitter size={20} />
              </a>
            </li>
            <li className="p-2 border border-gray-400 bg-gray-200 rounded-lg">
              <a
                href="https://www.instagram.com/__shiiivammm__/"
                target="_blank"
                className="text-gray-600"
              >
                <Instagram size={20} />
              </a>
            </li>
            <li className="p-2  border border-gray-400 bg-gray-200 rounded-lg">
              <a
                href="https://www.linkedin.com/in/the-shivam-gupta/"
                target="_blank"
                className="text-gray-600"
              >
                <Linkedin size={20} />
              </a>
            </li>
          </ul>

          <div className="text-sm text-gray-700 uppercase text-center sm:text-left mt-2">
            <span className="font-semibold text-gray-600">
              {t("header.freeShipping")}
            </span>
            {currency === "USD"
              ? t("header.Order Over - $40")
              : t("header.Order Over - ₹3320")}
          </div>

          <div className="flex space-x-2 text-gray-500">
            <select
              className="px-2 py-1 text-lg cursor-pointer"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD $</option>
              <option value="INR">INR ₹</option>
            </select>

            <select
              onChange={handleLanguageChange}
              className="px-2 py-1 text-lg uppercase cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Header Main */}
      <div className="py-4 border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap items-center justify-evenly gap-4 px-4 sm:px-6">
          <Link to="/">
            <img
              src="./src/assets/logo.png"
              alt="Logo"
              className="w-24 h-auto rounded-full sm:w-20"
            />
          </Link>

          {/* Search Box */}
          <div className="relative w-full max-w-md sm:max-w-sm">
            <input
              ref={inputRef}
              type="search"
              placeholder={t("header.searchPlaceholder")}
              className="w-full border border-gray-300 rounded-full px-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 caret-pink-500"
            />
            <button
              type="submit"
              onClick={handleFocus}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-600 cursor-pointer"
            >
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4">
            {user ? (
              <div className="relative group">
                <img
                  src={user.photoURL || "/src/assets/default-avatar.jpeg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                />
                <div className="absolute -left-1/2 hidden group-hover:block bg-white border border-gray-200 w-fit mt-2 p-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out z-50">
                  <p className="font-semibold text-gray-700">
                    {user.displayName || user.email}
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => signOut(auth)}
                      className="w-fit py-2 px-4 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-400 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="relative text-gray-600 cursor-pointer"
              >
                <CircleUser size={35} />
              </button>
            )}
            <button
              onClick={() => navigate("/favorites")}
              className="relative text-gray-600 cursor-pointer"
            >
              <Heart size={35} />
              <span className="absolute -top-1 -right-2 text-xs bg-pink-500 text-white rounded-full px-1 font-bold">
                {favorites.length}
              </span>
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="relative text-gray-600 cursor-pointer"
            >
              <ShoppingCart size={35} />
              <span className="absolute -top-1 -right-2 text-xs bg-pink-500 text-white rounded-full px-1 font-bold">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b border-gray-200">
        <div className="flex items-center justify-center container mx-auto">
          <ul className="flex space-x-8 py-4 text-lg font-bold text-gray-600">
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
              <div className="absolute left-1/2 transform -translate-x-1/4 w-fit h-[17em] bg-white shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 py-2">
                <div className="flex items-center justify-evenly gap-20 p-4 px-12 rounded-2xl mt-1">
                  <div className="relative">
                    <h3 className="font-bold mb-4">{t("dropdown.gadgets")}</h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/pc.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.desktop")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/laptop-screen.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.laptop")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/dslr-camera.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.camera")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/tablet.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.tablet")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/headphones.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.headphone")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <h3 className="font-bold mb-2">{t("dropdown.mens")}</h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/blazer.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.formal")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/jeans.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.casual")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/sports.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.sports")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/jacket.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.jacket")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/sunglasses.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.sunglasses")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <h3 className="font-bold mb-2">{t("dropdown.women")}</h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/dress.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.dressAndFrock")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/necklace.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.necklace")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/perfume.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.perfume")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/cosmetics.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.cosmetics")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/handbag.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.bags")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <h3 className="font-bold mb-2">
                      {t("dropdown.electronics")}
                    </h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/smartwatch.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.smartWatch")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/smart-tv.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.smartTV")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/computer-keyboard.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.keyboard")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/computer-mouse.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.mouse")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/microphone.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.microphone")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.men")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/6 w-[12em] h-[12em] bg-white shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/smartwatch.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.watch")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/cap.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.caps")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/cotton-polo-shirt.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.shirtAndTshirt")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/sneakers.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.shoes")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/shorts.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.shortAndJeans")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.women")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/5 w-[12em] h-[12em] bg-white shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/necklace.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.necklace")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/handbag.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.bags")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/dress.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.dressAndFrock")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/bracelet.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.bracelet")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/heals.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.heals")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.jewelry")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/5 w-[11em] h-[10em] bg-white shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/necklace.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.necklace")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/earings.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.earings")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/bracelet.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.bracelet")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/ring.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.rings")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="hover:text-pink-500 ease-in-out duration-200"
              >
                {t("header.perfume")}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/5 w-[12em] h-[10em] bg-white shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/deodorant.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.deodrant")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/air-freshner.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.airFreshner")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/perfume-bottle.png"
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.bodyPerfume")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src="/src/icons/spray.png"
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out">
                          {t("dropdown.clothesPerfume")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
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
