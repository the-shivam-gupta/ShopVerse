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
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");
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
      <div className="bg-gray-100 py-2 dark:bg-black">
        <div className="container mx-auto px-4 flex flex-wrap items-center sm:justify-between justify-center">
          <ul className="flex items-center justify-center space-x-2">
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

          <div className="text-sm text-gray-700 dark:text-gray-300 uppercase text-center sm:text-left mt-2">
            <span className="font-semibold text-gray-600 dark:text-gray-200">
              {t("header.freeShipping")}
            </span>
            {currency === "USD"
              ? t("header.Order Over - $40")
              : t("header.Order Over - ₹3320")}
          </div>

          <div className="flex space-x-2 text-gray-500 dark:text-gray-200">
            <select
              className="px-2 py-1 text-lg cursor-pointer dark:bg-gray-800 bg-gray-200 rounded-sm"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option className="dark:text-gray-300" value="USD">
                USD $
              </option>
              <option className="dark:text-gray-300" value="INR">
                INR ₹
              </option>
            </select>

            <select
              onChange={handleLanguageChange}
              className="px-2 py-1 text-lg uppercase cursor-pointer dark:bg-gray-800 bg-gray-200 rounded-sm"
            >
              <option className="dark:text-gray-300" value="en">
                English
              </option>
              <option className="dark:text-gray-300" value="hi">
                Hindi
              </option>
              <option className="dark:text-gray-300" value="es">
                Spanish
              </option>
            </select>
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Header Main */}
      <div className="py-4 border-t border-b border-gray-200 dark:border-gray-700 dark:bg-black">
        <div className="container mx-auto flex flex-wrap items-center justify-evenly gap-4 px-4 sm:px-6">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-24 h-auto rounded-full sm:w-20"
            />
          </Link>

          {/* Search Box */}
          <div className="relative w-full max-w-md sm:max-w-sm">
            <input
              ref={inputRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              placeholder={t("header.searchPlaceholder")}
              className="w-full border border-gray-300 dark:border-pink-500 dark:text-gray-50 bg-transparent rounded-full px-4 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 caret-pink-500
                   [&::-webkit-search-cancel-button]:appearance-none" // hides the default X
            />
            {/* Clear (X) Icon */}
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
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
                className="relative text-gray-600 dark:text-gray-300 cursor-pointer"
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

      {/* Login Modal */}
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
              <div className="absolute left-1/2 transform -translate-x-1/4 w-fit h-[17em] bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700 py-2">
                <div className="flex items-center justify-evenly gap-20 p-4 px-12 rounded-2xl mt-1">
                  <div className="relative">
                    <h3 className="font-bold mb-4">{t("dropdown.gadgets")}</h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200 dark:bg-gray-400"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={pc}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.desktop")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={laptop}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.laptop")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={dslr}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.camera")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={tablet}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.tablet")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={headphones}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.headphone")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <h3 className="font-bold mb-2">{t("dropdown.mens")}</h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200 dark:bg-gray-400"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={blazer}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.formal")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={jeans}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.casual")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={sports}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.sports")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={jacket}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.jacket")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={sunglasses}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.sunglasses")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <h3 className="font-bold mb-2">{t("dropdown.women")}</h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200 dark:bg-gray-400"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={dress}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.dressAndFrock")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={necklace}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.necklace")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={perfume}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.perfume")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={cosmetics}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.cosmetics")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={handbag}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.bags")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <h3 className="font-bold mb-2">
                      {t("dropdown.electronics")}
                    </h3>
                    <span className="absolute left-0 top-9 w-30 h-[1px] bg-gray-200 dark:bg-gray-400"></span>
                    <ul className="mt-6 space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={smartwatch}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.smartWatch")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={smartTv}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.smartTV")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={keyboard}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.keyboard")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={mouse}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.mouse")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={microphone}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
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
              <div className="absolute left-1/2 transform -translate-x-1/6 w-[12em] h-[12em] bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={smartwatch}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.watch")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={cap}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.caps")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={poloShirt}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.shirtAndTshirt")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={sneakers}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.shoes")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={shorts}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
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
              <div className="absolute left-1/2 transform -translate-x-1/5 w-[12em] h-[12em] bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={necklace}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.necklace")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={handbag}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.bags")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={dress}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.dressAndFrock")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={bracelet}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.bracelet")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={heals}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
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
              <div className="absolute left-1/2 transform -translate-x-1/5 w-[11em] h-[10em] bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={necklace}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.necklace")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={earings}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.earings")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={bracelet}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.bracelet")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={ring}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
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
              <div className="absolute left-1/2 transform -translate-x-1/5 w-[12em] h-[10em] bg-white dark:bg-black shadow-lg mt-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 z-50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="rounded-2xl">
                  <div className="relative text-left">
                    <ul className="space-y-3 text-gray-500 text-lg font-medium">
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={deodorant}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.deodrant")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={airFreshner}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.airFreshner")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={bodyPerfume}
                          width={26}
                          className="transform rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
                          {t("dropdown.bodyPerfume")}
                        </a>
                      </li>
                      <li className="flex gap-3 group/item items-center">
                        <img
                          src={spray}
                          width={26}
                          className="transform -rotate-12 transition-transform duration-300 group-hover/item:rotate-0 dark:invert"
                        />
                        <a className="hover:text-pink-500 cursor-pointer duration-200 ease-in-out dark:text-gray-300">
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
