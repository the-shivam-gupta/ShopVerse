import React, { useState } from "react";
import { Heart, Eye, Plus, Star, Shuffle } from "lucide-react";
import { useTranslation } from "react-i18next";
import CompareModal from "./CompareModal";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

const products = [
  {
    name: "card.Tshirt",
    category: "card.oversizeShirt",
    price: 41.0,
    rating: 4,
    originalPrice: 48.0,
    badge: "15% off",
    mainImage:
      "https://unstd.in/cdn/shop/files/SAGE-GREEN-2.jpg?v=1734507963&width=1200",
    hoverImage:
      "https://unstd.in/cdn/shop/files/BLACK_7df11807-93c3-49d9-8347-614a9160f3d7.jpg?v=1729851686&width=1200",
  },
  {
    name: "card.femaleWatch",
    category: "card.watch",
    price: 59.0,
    rating: 5,
    originalPrice: 67.0,
    mainImage: "https://m.media-amazon.com/images/I/81AmHv7jKsL._SX679_.jpg",
    hoverImage: "https://m.media-amazon.com/images/I/71F07y-AdAL._SX679_.jpg",
  },
  {
    name: "card.poloShirt",
    category: "card.shirt",
    price: 45.0,
    rating: 3,
    originalPrice: 56.0,
    badge: "SALE",
    mainImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7S4S_cU6eeigDnRXLCtaN-awIcyF9uyexJsasi6obJz16Tl5U7UWclUqGiokAISA6Qw&usqp=CAU",
    hoverImage:
      "https://assets.ajio.com/medias/sys_master/root/20240215/x4q0/65ce361205ac7d77bb5c302c/-473Wx593H-410478807-1515-MODEL.jpg",
  },
  {
    name: "card.sonyHeadphone",
    category: "card.headphone",
    price: 40.0,
    rating: 4,
    originalPrice: 55.0,
    mainImage: "https://m.media-amazon.com/images/I/51UBVW9enzL._SL1200_.jpg",
    hoverImage: "https://m.media-amazon.com/images/I/41jR+301vvL._SL1200_.jpg",
  },
  {
    name: "card.midiSkirt",
    category: "card.skirt",
    price: 25.0,
    rating: 5,
    originalPrice: 35.0,
    badge: "NEW",
    mainImage:
      "https://static.zara.net/assets/public/e667/4234/b16a4d7e96f6/ca4ead1f2a2d/04758010800-e1/04758010800-e1.jpg?ts=1740589030990&w=1126",
    hoverImage:
      "https://static.zara.net/assets/public/1bcd/bbbf/05904442b484/ddecba6c34c8/04758010800-e2/04758010800-e2.jpg?ts=1740589031074&w=750",
  },
  {
    name: "card.menBracelet",
    category: "card.bracelet",
    price: 35.0,
    rating: 5,
    originalPrice: 42.0,
    badge: "PERMIUM",
    mainImage:
      "https://in.danielwellington.com/cdn/shop/files/qs55z9vln2zkthusyjp3.png?v=1717669152",
    hoverImage:
      "https://in.danielwellington.com/cdn/shop/files/t2kdcsyps4da4bd99nps.png?v=1717669157",
  },
  {
    name: "card.menJacket",
    category: "card.jacket",
    price: 58.0,
    rating: 4,
    originalPrice: 65.0,
    mainImage:
      "https://static.zara.net/assets/public/f63e/cc27/af5849489e53/130a2d871651/03833399064-e1/03833399064-e1.jpg?ts=1734948309189&w=750",
    hoverImage:
      "https://static.zara.net/assets/public/9759/2066/3aad42ec99d2/6ccd24893888/03833399064-e2/03833399064-e2.jpg?ts=1734946680820&w=750",
  },
  {
    name: "card.menShoes",
    category: "card.shoes",
    price: 50.0,
    rating: 4,
    originalPrice: 56.0,
    mainImage: "https://m.media-amazon.com/images/I/61kliJGTrML._SY625_.jpg",
    hoverImage: "https://m.media-amazon.com/images/I/71XCHR8wBiL._SY625_.jpg",
  },
];

const ProductCard = ({ product, currency, onQuickView, onAddToCompare }) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const isFavorited = favorites.some((item) => item.name === product.name);
  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(product.name); // uses product.name as unique key
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      image: product.mainImage,
    };
    addToCart(cartProduct);
  };

  const stars = {
    total: 5, // total number of stars
    filled: Math.floor(product.rating), // number of fully filled stars
  };

  const conversionRate = 83; // 1 USD = 83 INR

  const price =
    currency === "USD"
      ? `$${product.price}`
      : `₹${Math.round(product.price * conversionRate)}`;

  const originalPrice =
    currency === "USD"
      ? `$${product.originalPrice}`
      : `₹${Math.round(product.originalPrice * conversionRate)}`;

  return (
    <div
      className="overflow-visible relative bg-white rounded-xl shadow hover:shadow-xl transition-all p-4 hover:translate-px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        {/* Images */}
        <img
          src={hovered ? product.hoverImage : product.mainImage}
          alt={product.name}
          className="w-full h-64 object-contain transition-all duration-300 bg-transparent ease-linear"
        />

        {/* Icons */}
        <div
          className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ease-linear ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Favorite */}
          <div className="relative group">
            <button
              onClick={handleFavoriteClick}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <Heart
                size={20}
                color={isFavorited ? "red" : "black"}
                fill={isFavorited ? "red" : "none"}
              />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.favorite")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>

          {/* Quick View */}
          <div className="relative group">
            <button
              onClick={() => onQuickView(product)}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <Eye size={20} />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.quickView")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>

          {/* Compare */}
          <div className="relative group">
            <button
              onClick={() => onAddToCompare(product)}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
              strokeWidth={1.5}
            >
              <Shuffle size={20} />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.compare")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="relative group">
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <Plus size={20} />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.addToCart")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Discount badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-col">
        <p className="text-pink-400 font-semibold text-md text-left ml-2 cursor-pointer">
          {t(product.category)}
        </p>
        <h3 className="text-gray-500 text-[1em] mt-1 text-left text-xl tracking-wider ml-2 cursor-pointer hover:text-gray-600 duration-200">
          {t(product.name)}
        </h3>
        <div className="flex justify-start items-start text-yellow-400 mt-2 ml-2">
          {[...Array(stars.total)].map((_, index) => (
            <Star
              key={index}
              fill={index < stars.filled ? "orange" : "none"}
              strokeWidth={1}
            />
          ))}
        </div>
        <div className="mt-2 text-left space-x-4 ml-2">
          <span className="text-lg font-bold text-gray-800">{price}</span>
          <span className="text-gray-400 line-through text-md">
            {originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProductCard, products };
