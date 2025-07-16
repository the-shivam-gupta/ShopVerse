import React, { useState, useCallback, useMemo } from "react";
import { Heart, Eye, Plus, Star, Shuffle } from "lucide-react";
import { useTranslation } from "react-i18next";
import CompareModal from "./CompareModal";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import BadgeRibbon from "./BadgeRibbon";
import toast from "react-hot-toast";

const products = [
  // SHIRTS
  {
    name: "card.Tshirt",
    category: "card.oversizeShirt",
    price: 41.0,
    rating: 4,
    originalPrice: 48.0,
    badge: "15% off",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746936945/SAGE-GREEN-2-Photoroom_by0rqf.png",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746943109/BLACK_7df11807-93c3-49d9-8347-614a9160f3d7_adgvoe.webp",
    colors: ["#6b7280", "#000000"],
    sizes: ["S", "M", "L", "XL"],
    description: "Comfortable oversized T-shirt perfect for casual wear.",
    inStock: true,
    reviewCount: 62,
    materialType: "Cotton",
    fitType: "Oversized",
    sleeveType: "Half Sleeve",
    pattern: "Solid",
    collarType: "Crew Neck",
    origin: "India",
  },
  {
    name: "card.poloShirt",
    category: "card.shirt",
    price: 45.0,
    rating: 3,
    originalPrice: 56.0,
    badge: "SALE",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746939670/images-Photoroom_qumjbl.png",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746940244/-473Wx593H-410478807-1515-MODEL_vjo1tk_044d16.avif",
    colors: ["#ffffff", "#1e3a8a"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic polo shirt ideal for both casual and semi-formal looks.",
    inStock: true,
    reviewCount: 40,
    materialType: "Cotton Blend",
    fitType: "Regular Fit",
    sleeveType: "Half Sleeve",
    pattern: "Solid",
    collarType: "Polo",
    origin: "India",
  },
  {
    name: "card.mencasualShirt",
    category: "card.casualShirt",
    price: 38.0,
    rating: 4,
    originalPrice: 45.0,
    badge: "NEW",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746940586/011a2cad5a22200d6085a7fccef76bf1cad8ac8a_egbdlo.avif",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746940952/3b324e8953a17cf0d84b98cedfec69c9fb4ae304_okoyfi.avif",
    colors: ["#9ca3af", "#4b5563"],
    sizes: ["S", "M", "L", "XL"],
    description: "Easygoing casual shirt suitable for daily wear.",
    inStock: true,
    reviewCount: 53,
    materialType: "Cotton",
    fitType: "Regular Fit",
    sleeveType: "Full Sleeve",
    pattern: "Checked",
    collarType: "Spread",
    origin: "India",
  },
  {
    name: "card.menformalShirt",
    category: "card.formalShirt",
    price: 49.0,
    rating: 5,
    originalPrice: 60.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746941155/07545309538-e1_uhxgy4.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746941322/01063309403-e1_ueh3ky.jpg",
    colors: ["#f3f4f6", "#111827"],
    sizes: ["S", "M", "L", "XL"],
    description: "A crisp, formal shirt for professional occasions.",
    inStock: true,
    reviewCount: 75,
    materialType: "Cotton Blend",
    fitType: "Slim Fit",
    sleeveType: "Full Sleeve",
    pattern: "Solid",
    collarType: "Spread",
    origin: "India",
  },
  {
    name: "card.mendenimShirt",
    category: "card.denimShirt",
    price: 52.0,
    rating: 4,
    originalPrice: 65.0,
    badge: "HOT",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746941427/04470424407-e1_pwahdl.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746941663/04470424407-e2_zw6rby.jpg",
    colors: ["#1f2937", "#3b82f6"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A lightweight denim overshirt perfect for layering year-round.",
    inStock: true,
    reviewCount: 87,
    materialType: "Denim",
    fitType: "Regular Fit",
    sleeveType: "Full Sleeve",
    pattern: "Solid",
    collarType: "Spread",
    origin: "India",
  },
  {
    name: "card.menprintedShirt",
    category: "card.printedShirt",
    price: 45.0,
    rating: 4,
    originalPrice: 55.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746941816/shopping_rimzm3.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746941926/shopping_zydzpc.webp",
    colors: ["#e5e7eb", "#6d28d9"],
    sizes: ["S", "M", "L", "XL"],
    description: "Stylish printed shirt for a bold, standout look.",
    inStock: true,
    reviewCount: 68,
    materialType: "Rayon",
    fitType: "Relaxed Fit",
    sleeveType: "Half Sleeve",
    pattern: "Printed",
    collarType: "Camp Collar",
    origin: "India",
  },

  // ELECRONICS
  {
    name: "card.femaleWatch",
    category: "card.watch",
    price: 59.0,
    rating: 5,
    originalPrice: 67.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746943210/81AmHv7jKsL._SX679__d9avyi.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746943248/71F07y-AdAL._SX679__fwcv6h.jpg",
    colors: ["#000000", "#f9fafb"],
    description:
      "Elegant women's watch with modern design and premium materials.",
    inStock: true,
    reviewCount: 120,
    brand: "Fossil",
    type: "Analog",
    batteryLife: "2 years",
    connectivity: "None",
  },
  {
    name: "card.sonyHeadphone",
    category: "card.headphone",
    price: 40.0,
    rating: 4,
    originalPrice: 55.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968435/51UBVW9enzL._SL1200__dbht3c.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968463/41jR_301vvL._SL1200__vddqsr.jpg",
    colors: ["#1f2937", "#ffffff"],
    description: "Sony over-ear headphones with deep bass and noise isolation.",
    inStock: true,
    reviewCount: 87,
    brand: "Sony",
    connectivity: "Wired",
    batteryLife: "N/A",
    type: "Over-Ear",
  },
  {
    name: "card.phone",
    category: "card.smartphone",
    price: 999.0,
    rating: 5,
    originalPrice: 1099.0,
    badge: "NEW",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968524/samsung-s23-ultra-5g-1-11-485x485-optimized_vqrw8b.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968553/samg7_launtp.png",
    colors: ["#111827", "#f3f4f6"],
    description:
      "High-performance smartphone with cutting-edge features and stunning design.",
    inStock: true,
    reviewCount: 210,
    brand: "Samsung",
    screenSize: "6.8 inches",
    batteryLife: "24 hours",
    storage: "256GB",
    camera: "108MP",
  },
  {
    name: "card.tab",
    category: "card.tablet",
    price: 149.99,
    rating: 4,
    originalPrice: 179.99,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968626/shopping_rnti4f.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968643/shopping_hfcza3.webp",
    colors: ["#d1d5db", "#4b5563"],
    description: "Lightweight and powerful tablet, perfect for work and play.",
    inStock: false,
    reviewCount: 134,
    brand: "Lenovo",
    screenSize: "10.1 inches",
    batteryLife: "12 hours",
    storage: "64GB",
    connectivity: "Wi-Fi",
  },
  {
    name: "card.DellLaptop",
    category: "card.laptop",
    price: 799.99,
    rating: 5,
    originalPrice: 899.99,
    badge: "SALE",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968702/shopping_c8kn76.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968705/shopping_gkauct.webp",
    colors: ["#1f2937", "#d1d5db"],
    description:
      "Reliable Dell laptop with high performance for productivity and entertainment.",
    inStock: true,
    reviewCount: 98,
    brand: "Dell",
    screenSize: "15.6 inches",
    processor: "Intel i5",
    ram: "8GB",
    storage: "512GB SSD",
  },
  {
    name: "card.smartwatch",
    category: "card.watch",
    price: 129.0,
    rating: 4,
    originalPrice: 149.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968769/shopping_dkhn68.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968771/shopping_pr8j5k.webp",
    colors: ["#10b981", "#1e3a8a"],
    description:
      "Advanced smartwatch with fitness tracking, notifications, and more.",
    inStock: true,
    reviewCount: 152,
    brand: "Amazfit",
    batteryLife: "7 days",
    connectivity: "Bluetooth",
    features: ["Heart Rate", "Step Count", "Notifications"],
  },
  {
    name: "card.wiredPowerBank",
    category: "card.powerBank",
    price: 79.99,
    rating: 4,
    originalPrice: 89.99,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968822/shopping_ykpho1.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968825/shopping_yfm0tn.webp",
    colors: ["#111827", "#f3f4f6"],
    description:
      "High-capacity wired power bank for fast and reliable charging.",
    inStock: false,
    reviewCount: 110,
    brand: "Anker",
    capacity: "20000mAh",
    ports: 2,
    output: "18W",
  },

  // BOTTOMS
  {
    name: "card.midiSkirt",
    category: "card.skirt",
    price: 25.0,
    rating: 5,
    originalPrice: 35.0,
    badge: "NEW",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746942111/04758010800-e1_eeizat.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746943018/04758010800-e2_fgyqp4.jpg",
    colors: ["#e5e7eb", "#1f2937"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Chic and flowy midi skirt perfect for casual and formal wear.",
    inStock: true,
    reviewCount: 102,
    material: "Cotton Blend",
    length: "Midi",
    fit: "Relaxed",
  },
  {
    name: "card.menjeans",
    category: "card.jeans",
    price: 69.9,
    rating: 4,
    originalPrice: 79.9,
    badge: "TRENDING",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968891/shopping_bances.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746968940/shopping_or61a1.webp",
    colors: ["#1f2937", "#6b7280"],
    sizes: ["30", "32", "34", "36"],
    description: "Classic straight-fit jeans with modern style and durability.",
    inStock: true,
    reviewCount: 89,
    material: "Denim",
    fit: "Straight",
    stretch: true,
  },
  {
    name: "card.mentrousers",
    category: "card.trousers",
    price: 43.9,
    rating: 4,
    originalPrice: 59.9,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969042/shopping_nnszq6.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969047/shopping_yjhrd9.webp",
    colors: ["#374151", "#9ca3af"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Versatile men's trousers designed for comfort and everyday wear.",
    inStock: false,
    reviewCount: 76,
    material: "Cotton",
    fit: "Slim",
    waistRise: "Mid-rise",
  },
  {
    name: "card.menshorts",
    category: "card.shorts",
    price: 49.9,
    rating: 4,
    originalPrice: 59.9,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969152/shopping_ln3rcp.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969156/shopping_s0hwm3.webp",
    colors: ["#f3f4f6", "#1e3a8a"],
    sizes: ["S", "M", "L"],
    description: "Breathable and stylish shorts perfect for warm weather days.",
    inStock: true,
    reviewCount: 91,
    material: "Polyester",
    length: "Above Knee",
    features: ["Elastic Waistband", "Quick Dry"],
  },

  // ACCESSORIES
  {
    name: "card.menBracelet",
    category: "card.bracelet",
    price: 35.0,
    rating: 5,
    originalPrice: 42.0,
    badge: "PREMIUM",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969252/qs55z9vln2zkthusyjp3_kkvxjv.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969259/t2kdcsyps4da4bd99nps_ix0dcp.webp",
    colors: ["#b5651d", "#654321"],
    sizes: ["One Size"],
    description:
      "Elegant men’s bracelet made from premium materials, perfect for everyday wear.",
    inStock: true,
    reviewCount: 58,
    materialType: "Stainless Steel",
    style: "Casual",
    closureType: "Magnetic",
    origin: "India",
  },
  {
    name: "card.womenNecklace",
    category: "card.necklace",
    price: 89.0,
    rating: 4,
    originalPrice: 99.0,
    badge: "TRENDING",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969388/shopping_b8kvbg.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969395/shopping_cvnzjd.webp",
    colors: ["#d4af37", "#c0c0c0"],
    sizes: ["One Size"],
    description:
      "Stylish and delicate necklace designed to elevate any outfit.",
    inStock: true,
    reviewCount: 72,
    materialType: "Alloy",
    style: "Boho",
    closureType: "Lobster Claw",
    origin: "India",
  },
  {
    name: "card.womenRings",
    category: "card.rings",
    price: 49.0,
    rating: 5,
    originalPrice: 59.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969539/shopping_npwdfg.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/a_hflip/f_png/v1746969545/shopping_rzdl8n.webp",
    colors: ["#ffd700", "#ffffff"],
    sizes: ["6", "7", "8", "9"],
    description:
      "Beautiful rings crafted with attention to detail, perfect for any occasion.",
    inStock: true,
    reviewCount: 95,
    materialType: "Gold Plated",
    style: "Elegant",
    origin: "India",
  },
  {
    name: "card.menSunglasses",
    category: "card.sunglasses",
    price: 120.0,
    rating: 4,
    originalPrice: 129.0,
    badge: "NEW",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969718/shopping_p5zqky.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969729/shopping_eogcmz.webp",
    colors: ["#000000", "#4b4b4b"],
    sizes: ["One Size"],
    description: "Modern and sleek sunglasses offering full UV protection.",
    inStock: true,
    reviewCount: 61,
    materialType: "Polycarbonate",
    style: "Modern",
    origin: "India",
  },
  {
    name: "card.menWallet",
    category: "card.wallet",
    price: 20.69,
    rating: 4,
    originalPrice: 25.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969796/shopping_qijinu.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969801/shopping_o3ulge.webp",
    colors: ["#3b2f2f", "#5a4a42"],
    sizes: ["One Size"],
    description: "Compact and durable men’s wallet with multiple compartments.",
    inStock: true,
    reviewCount: 77,
    materialType: "Leather",
    style: "Classic",
    origin: "India",
  },

  // OUTWEAR
  {
    name: "card.menJacket",
    category: "card.jacket",
    price: 58.0,
    rating: 4,
    originalPrice: 65.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969892/03833399064-e1_lf3whl.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746969897/03833399064-e2_fnp8qq.jpg",
    colors: ["#000000", "#1c1c1c", "#4b4b4b"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Stylish men’s jacket perfect for casual and semi-formal occasions.",
    inStock: true,
    reviewCount: 48,
    materialType: "Cotton Blend",
    waterResistance: "Mild",
    closureType: "Zipper",
    origin: "India",
  },
  {
    name: "card.menBlazer",
    category: "card.blazer",
    price: 75.0,
    rating: 5,
    originalPrice: 90.0,
    badge: "NEW",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970008/shopping_csdi1y.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970017/shopping_ddy7jl.webp",
    colors: ["#2e2e2e", "#555555"],
    sizes: ["M", "L", "XL"],
    description:
      "Elegant men’s blazer ideal for formal events and office wear.",
    inStock: true,
    reviewCount: 55,
    materialType: "Polyester",
    closureType: "Button",
    origin: "India",
  },
  {
    name: "card.longCoat",
    category: "card.coat",
    price: 92.0,
    rating: 5,
    originalPrice: 110.0,
    badge: "WINTER",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970105/41_PfFffWsL._AC_SX522__a7ymdz.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970112/41QOYsRIyzL._AC_SX522__l8fy70.jpg",
    colors: ["#444444", "#222222", "#777777"],
    sizes: ["L", "XL", "XXL"],
    description: "Warm and stylish long coat designed for winter weather.",
    inStock: true,
    reviewCount: 39,
    materialType: "Wool Blend",
    waterResistance: "Medium",
    closureType: "Button",
    origin: "India",
  },
  {
    name: "card.blackHoodie",
    category: "card.hoodie",
    price: 34.0,
    rating: 4,
    originalPrice: 40.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970174/shopping_xs26lw.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970181/shopping_vnpggq.webp",
    colors: ["#000000", "#964B00"],
    sizes: ["S", "M", "L"],
    description:
      "Comfortable black hoodie suitable for casual wear and workouts.",
    inStock: true,
    reviewCount: 64,
    materialType: "Fleece",
    closureType: "Pullover",
    origin: "India",
  },
  {
    name: "card.greyCardigan",
    category: "card.cardigan",
    price: 48.0,
    rating: 4,
    originalPrice: 56.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970245/shopping_t7vtlu.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970255/shopping_pgygkk.webp",
    colors: ["#808080", "#a9a9a9"],
    sizes: ["M", "L"],
    description: "Soft and cozy grey cardigan, perfect for layering.",
    inStock: true,
    reviewCount: 52,
    materialType: "Acrylic",
    closureType: "Open Front",
    origin: "India",
  },
  {
    name: "card.denimVest",
    category: "card.vest",
    price: 29.0,
    rating: 3,
    originalPrice: 34.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970361/shopping_jq3pqk.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970368/shopping_cgotmj.webp",
    colors: ["#1e3d59", "#2e5a88"],
    sizes: ["S", "M", "L"],
    description: "Casual denim vest with classic styling for a timeless look.",
    inStock: true,
    reviewCount: 33,
    materialType: "Denim",
    closureType: "Button",
    origin: "India",
  },

  // SHOES
  {
    name: "card.menShoes",
    category: "card.shoes",
    price: 50.0,
    rating: 4,
    originalPrice: 56.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970478/61kliJGTrML._SY625__nteiu5.jpg",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970484/71XCHR8wBiL._SY625__pzjpje.jpg",
    colors: ["#000000", "#7f7f7f"],
    sizes: ["8", "9", "10", "11"],
    description:
      "Durable men's shoes suitable for both casual and formal settings.",
    inStock: true,
    reviewCount: 58,
    material: "Synthetic Leather",
    soleMaterial: "Rubber",
    closureType: "Lace-Up",
    occasion: "Casual, Formal",
    shoeType: "Dress Shoes",
  },
  {
    name: "card.whiteSneakers",
    category: "card.sneakers",
    price: 55.0,
    rating: 4,
    originalPrice: 65.0,
    badge: "TRENDING",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970532/40341087_1-puma-by-cliq-mens-smash-pop-white-casual-sneakers_k220ml.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970541/40341087-3_1-puma-by-cliq-mens-smash-pop-white-casual-sneakers_lbluy4.webp",
    colors: ["#ffffff"],
    sizes: ["8", "9", "10", "11"],
    description:
      "Comfortable and stylish white sneakers perfect for everyday wear.",
    inStock: true,
    reviewCount: 76,
    material: "Mesh & Synthetic",
    soleMaterial: "EVA",
    closureType: "Lace-Up",
    occasion: "Casual",
    shoeType: "Sneakers",
  },
  {
    name: "card.leatherSandals",
    category: "card.sandals",
    price: 30.0,
    rating: 3,
    originalPrice: 38.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970586/shopping_eyemra.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970595/shopping_l3l3cv.webp",
    colors: ["#a0522d", "#deb887"],
    sizes: ["9", "10", "11"],
    description:
      "Casual leather sandals ideal for warm weather and beach trips.",
    inStock: true,
    reviewCount: 41,
    material: "Genuine Leather",
    soleMaterial: "PU",
    closureType: "Buckle",
    occasion: "Beach, Casual",
    shoeType: "Sandals",
  },
  {
    name: "card.ankleBoots",
    category: "card.boots",
    price: 68.0,
    rating: 5,
    originalPrice: 79.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970650/shopping_d57b3i.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970661/shopping_tredvn.webp",
    colors: ["#5c3a21", "#3e2f1c"],
    sizes: ["8", "9", "10"],
    description: "Premium ankle boots crafted for durability and style.",
    inStock: true,
    reviewCount: 69,
    material: "Suede Leather",
    soleMaterial: "TPR",
    closureType: "Zipper",
    occasion: "Casual, Outdoor",
    shoeType: "Boots",
  },
  {
    name: "card.beachFlipFlops",
    category: "card.flipFlops",
    price: 12.0,
    rating: 4,
    originalPrice: 16.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970740/shopping_fgh6ty.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970750/shopping_ehpyoo.webp",
    colors: ["#ffcc00", "#ffdd33"],
    sizes: ["One Size"],
    description:
      "Lightweight and comfortable flip flops for beach and casual use.",
    inStock: true,
    reviewCount: 47,
    material: "Rubber",
    soleMaterial: "Rubber",
    closureType: "Slip-On",
    occasion: "Beach, Casual",
    shoeType: "Flip-Flops",
  },
  {
    name: "card.casualLoafers",
    category: "card.loafers",
    price: 44.0,
    rating: 4,
    originalPrice: 52.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970863/shopping_oj6enk.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970872/shopping_xree37.webp",
    colors: ["#8b4513", "#a0522d"],
    sizes: ["8", "9", "10"],
    description: "Comfortable casual loafers for everyday wear.",
    inStock: true,
    reviewCount: 50,
    material: "Faux Leather",
    soleMaterial: "TPR",
    closureType: "Slip-On",
    occasion: "Casual",
    shoeType: "Loafers",
  },

  // BAGS
  {
    name: "card.casualBackpack",
    category: "card.backpack",
    price: 39.0,
    rating: 4,
    originalPrice: 45.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970953/shopping_qmysmp.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746970960/shopping_esmb0z.webp",
    colors: ["#333333", "#666666"],
    sizes: ["One Size"],
    description: "Durable casual backpack suitable for daily use and travel.",
    inStock: true,
    reviewCount: 43,
    materialType: "Polyester",
    compartments: 5,
    waterResistance: "Yes",
    strapType: "Padded Shoulder Straps",
    closureType: "Zipper",
    weight: "700g",
    careInstructions: "Wipe with damp cloth",
  },
  {
    name: "card.luxuryHandbag",
    category: "card.handbag",
    price: 85.0,
    rating: 5,
    originalPrice: 98.0,
    badge: "PREMIUM",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971033/shopping_ou38ur.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971039/shopping_idtpuf.webp",
    colors: ["#d4af37", "#b8860b"],
    sizes: ["One Size"],
    description:
      "Elegant luxury handbag with premium materials and craftsmanship.",
    inStock: true,
    reviewCount: 38,
    materialType: "Vegan Leather",
    compartments: 3,
    waterResistance: "No",
    strapType: "Adjustable Strap",
    closureType: "Magnetic Flap",
    weight: "520g",
    careInstructions: "Avoid contact with moisture",
  },
  {
    name: "card.simpleToteBag",
    category: "card.toteBag",
    price: 26.0,
    rating: 4,
    originalPrice: 32.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971103/shopping_nvhrs5.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971110/shopping_g2l3oh.webp",
    colors: ["#a0522d", "#d2b48c"],
    sizes: ["One Size"],
    description: "Simple and practical tote bag perfect for everyday errands.",
    inStock: true,
    reviewCount: 47,
    materialType: "Canvas",
    compartments: 2,
    waterResistance: "No",
    strapType: "Double Handles",
    closureType: "Open Top",
    weight: "450g",
    careInstructions: "Hand wash with mild detergent",
  },
  {
    name: "card.menMessengerBag",
    category: "card.messengerBag",
    price: 45.0,
    rating: 4,
    originalPrice: 53.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971225/shopping_y4uwno.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/v1746971233/shopping_oxtca8.webp",
    colors: ["#3b2f2f", "#4d3a3a"],
    sizes: ["One Size"],
    description:
      "Stylish messenger bag designed for convenience and everyday use.",
    inStock: true,
    reviewCount: 34,
    materialType: "PU Leather",
    compartments: 4,
    waterResistance: "Water Resistant",
    strapType: "Crossbody Strap",
    closureType: "Buckle + Zipper",
    weight: "680g",
    careInstructions: "Clean with leather conditioner",
  },
  {
    name: "card.sportDuffelBag",
    category: "card.duffelBag",
    price: 42.0,
    rating: 4,
    originalPrice: 50.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971281/shopping_bjkvyv.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971290/shopping_h7vtjs.webp",
    colors: ["#000000", "#2f4f4f"],
    sizes: ["One Size"],
    description: "Durable sport duffel bag ideal for gym and travel.",
    inStock: true,
    reviewCount: 29,
    materialType: "Nylon",
    compartments: 6,
    waterResistance: "Yes",
    strapType: "Detachable Shoulder Strap",
    closureType: "Zipper",
    weight: "900g",
    careInstructions: "Machine washable",
  },

  // SkinCare
  {
    name: "card.skinCareSet",
    category: "card.skincare",
    price: 38.0,
    rating: 5,
    originalPrice: 45.0,
    badge: "SELF-CARE",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971370/shopping_y6qpgy.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/v1746971379/shopping_ixijyg.webp",
    colors: ["#f5e1da", "#f1c1b6", "#f8d6cc"],
    sizes: ["Standard"],
    description: "Complete skin care set for glowing, healthy skin.",
    inStock: true,
    reviewCount: 82,
    skinType: "All Skin Types",
    ingredients: ["Aloe Vera", "Vitamin C", "Hyaluronic Acid"],
    applicationArea: "Face",
    careInstructions: "Store in a cool, dry place",
    form: "Cream & Serum",
  },
  {
    name: "card.matteMakeupKit",
    category: "card.makeup",
    price: 44.0,
    rating: 4,
    originalPrice: 53.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971492/shopping_i7xqyy.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971507/shopping_grli7g.webp",
    colors: ["#c48b8b", "#a3676d", "#814b52"],
    sizes: ["Standard"],
    description: "Matte makeup kit with long-lasting, high-pigment colors.",
    inStock: true,
    reviewCount: 65,
    skinType: "Normal to Oily",
    ingredients: ["Talc", "Mica", "Iron Oxide"],
    applicationArea: "Face",
    careInstructions: "Keep lid closed to prevent drying",
    form: "Powder & Cream",
  },
  {
    name: "card.perfumeSet",
    category: "card.perfume",
    price: 60.0,
    rating: 5,
    originalPrice: 72.0,
    badge: "BESTSELLER",
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/v1746971585/shopping_gp0ljb.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971593/shopping_xub5a8.webp",
    colors: ["#f3d2d2", "#f5c6c6"],
    sizes: ["50ml", "100ml"],
    description:
      "Popular perfume set with lasting fragrance for all occasions.",
    inStock: true,
    reviewCount: 94,
    scent: "Floral & Musk",
    gender: "Unisex",
    applicationArea: "Neck, Wrists",
    careInstructions: "Keep away from heat or flame",
    form: "Spray",
  },
  {
    name: "card.haircareEssentials",
    category: "card.haircare",
    price: 32.0,
    rating: 4,
    originalPrice: 38.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971641/shopping_zhc2n4.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/v1746971648/shopping_vfcuon.webp",
    colors: ["#f9e6d2", "#f4c9a9"],
    sizes: ["Standard"],
    description: "Essential hair care products for smooth, healthy hair.",
    inStock: true,
    reviewCount: 59,
    hairType: "Dry & Frizzy",
    ingredients: ["Argan Oil", "Keratin", "Coconut Extract"],
    applicationArea: "Hair & Scalp",
    careInstructions: "Use twice a week for best results",
    form: "Liquid & Cream",
  },
  {
    name: "card.groomingKitMen",
    category: "card.groomingKit",
    price: 50.0,
    rating: 5,
    originalPrice: 58.0,
    mainImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971786/shopping_odnmtx.webp",
    hoverImage:
      "https://res.cloudinary.com/djgykvahm/image/upload/e_background_removal/f_png/v1746971800/shopping_e5jvsr.webp",
    colors: ["#323232", "#4b4b4b"],
    sizes: ["Standard"],
    description: "Complete grooming kit tailored for men's daily needs.",
    inStock: true,
    reviewCount: 71,
    gender: "Male",
    applicationArea: "Face & Body",
    ingredients: ["Charcoal", "Aloe Vera", "Menthol"],
    careInstructions: "Dry after use and store in a case",
    form: "Multiple (cream, razor, oil)",
  },
];

const ProductCard = React.memo(
  ({
    product,
    currency,
    onQuickView,
    onAddToCompare,
    onAddToCart,
    isFavorited,
    onToggleFavorite,
  }) => {
    const { t } = useTranslation();
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
      const trimmedCategory = product.category.replace(/^card\./, "");
      const trimmedName = product.name.replace(/^card\./, "");
      const encodedCategory = encodeURIComponent(trimmedCategory);
      const encodedName = encodeURIComponent(trimmedName);
      navigate(`/product/${encodedCategory}/${encodedName}`);
    };

    const handleAddToCart = useCallback(() => {
      const cartProduct = {
        ...product,
        image: product.mainImage,
        selectedSize: product.selectedSize ?? product.sizes?.[0] ?? null,
        selectedColor: product.selectedColor ?? product.colors?.[0] ?? null,
      };
      onAddToCart(cartProduct);
    }, [product, onAddToCart]);

    const stars = {
      total: 5,
      filled: Math.floor(product.rating),
    };

    const conversionRate = 83;

    const price = useMemo(() => {
      return currency === "USD"
        ? `$${product.price}`
        : `₹${Math.round(product.price * conversionRate)}`;
    }, [product.price, currency]);

    const originalPrice = useMemo(() => {
      return currency === "USD"
        ? `$${product.originalPrice}`
        : `₹${Math.round(product.originalPrice * conversionRate)}`;
    }, [product.originalPrice, currency]);

    return (
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="overflow-hidden w-full h-auto relative bg-white dark:bg-transparent rounded-xl shadow hover:shadow-xl dark:hover:shadow-md dark:shadow-gray-100 p-4 cursor-pointer"
        onClick={handleCardClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative">
          <div className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-pink-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg">
            {/* Main Image */}
            <img
              loading="lazy"
              src={product.mainImage}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 z-[1] ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Hover Image */}
            <img
              loading="lazy"
              src={product.hoverImage}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 z-[2] ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Icons */}
          <div
            className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ease-linear z-3 ${
              hovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
          >
            {/* Favorite */}
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
              >
                <Heart
                  size={20}
                  color={isFavorited ? "red" : "black"}
                  fill={isFavorited ? "red" : "none"}
                />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                {t("card.favorite")}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
              </div>
            </div>

            {/* Quick View */}
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
              >
                <Eye size={20} />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                {t("card.quickView")}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
              </div>
            </div>

            {/* Compare */}
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCompare(product);
                }}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
                strokeWidth={1.5}
              >
                <Shuffle size={20} />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                {t("card.compare")}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!product.inStock) {
                    toast.error(t("card.outOfStockMessage"), { icon: "🚫" });
                    return;
                  }
                  handleAddToCart();
                  toast.success(
                    t("card.addedToCartMessage", {
                      category: t(product.category),
                    })
                  );
                }}
                className={`p-2 rounded-full shadow transition-all ${
                  product.inStock
                    ? "bg-white hover:bg-gray-100 cursor-pointer"
                    : "bg-white hover:bg-gray-100 cursor-no-drop"
                }`}
              >
                <Plus size={20} />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                {t("card.addToCart")}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Discount badge */}
          <BadgeRibbon
            className="top-14 -left-9 -rotate-45 origin-top-left w-[140px]"
            badge={product.badge}
          />
        </div>

        {/* Details */}
        <div className="mt-4 flex flex-col">
          <p className="text-pink-400 font-semibold text-md text-left ml-2 cursor-pointer">
            {t(product.category)}
          </p>
          <h3 className="text-gray-500 dark:text-gray-300 text-[1em] mt-1 text-left text-xl tracking-wider ml-2 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200 duration-200 line -clamp-1">
            {t(product.name)}
          </h3>
          <div className="flex justify-start items-start text-yellow-400 mt-2 ml-2">
            {[...Array(stars.total)].map((_, index) => (
              <Star
                key={index}
                fill={index < stars.filled ? "orange" : "none"}
                strokeWidth={1}
                className="border-yellow-200 dark:border-yellow-400"
              />
            ))}
          </div>
          <div className="mt-2 text-left space-x-4 ml-2">
            <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {price}
            </span>
            <span className="text-gray-400 dark:text-gray-400 line-through text-md">
              {originalPrice}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

export { ProductCard, products };
