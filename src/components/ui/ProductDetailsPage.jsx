import { useParams } from "react-router-dom";
import { products as allProducts } from "./ProductCard";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { useCart } from "../context/CartContext";
import BadgeRibbon from "./BadgeRibbon";
import toast from "react-hot-toast";
import SizeGuideModal from "./SizeGuideModal";

const ProductDetailsPage = ({ currency }) => {
  const { productCategory, productName } = useParams();
  const decodedCategory = decodeURIComponent(productCategory);
  const decodedName = decodeURIComponent(productName);
  const product = allProducts.find(
    (p) =>
      p.category.replace(/^card\./, "") === decodedCategory &&
      p.name.replace(/^card\./, "") === decodedName
  );
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(product?.mainImage);
  const { addToCart } = useCart();
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);

  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product && product.mainImage) {
      setSelectedImage(product.mainImage);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="dark:bg-black bg-gray-100 min-h-screen">
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-center py-40 w-full"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t("productdetails.productNotFound")}
          </p>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      image: product.mainImage,
      selectedSize,
      selectedColor,
    };
    addToCart(cartProduct);
    console.log("Adding to cart:", cartProduct);
  };

  const handleBuyNow = (product) => {
    console.log("Buy now", product);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black p-2">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-pink-500 my-4">
        More About This Product
      </h2>
      <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-4" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-gray-900 rounded-[32px] shadow-xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 p-4 sm:p-6 md:p-10 items-center relative"
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t(product.name)}
          </h1>
          <p className="uppercase text-sm font-semibold text-pink-600 dark:text-pink-400 mb-1">
            {t(product.category)}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t(product.description)}
          </p>

          <div className="flex gap-3 mt-2">
            {[product.mainImage, product.hoverImage].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-14 h-14 border-2 rounded-xl p-1 cursor-pointer ${
                  selectedImage === img
                    ? "border-pink-500 dark:border-gray-300 dark:bg-white"
                    : "border-gray-300 dark:border-gray-600 hover:border-pink-200 dark:hover:border-gray-500"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-gray-500 dark:from-gray-300 via-gray-300 dark:via-gray-500 to-transparent my-2 sm:my-6" />

          <div className="">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">
              Product Details
            </h2>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {product.materialType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Material type:</span>
                  <span className="flex-1">{product.materialType}</span>
                </div>
              )}
              {product.fitType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Fit type:</span>
                  <span className="flex-1">{product.fitType}</span>
                </div>
              )}
              {product.sleeveType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Sleeve type:</span>
                  <span className="flex-1">{product.sleeveType}</span>
                </div>
              )}
              {product.pattern && (
                <div className="flex">
                  <span className="w-48 font-semibold">Pattern:</span>
                  <span className="flex-1">{product.pattern}</span>
                </div>
              )}
              {product.collarType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Collar type:</span>
                  <span className="flex-1">{product.collarType}</span>
                </div>
              )}
              {product.closureType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Closure type:</span>
                  <span className="flex-1">{product.closureType}</span>
                </div>
              )}
              {product.heelType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Heel type:</span>
                  <span className="flex-1">{product.heelType}</span>
                </div>
              )}
              {product.waterResistance && (
                <div className="flex">
                  <span className="w-48 font-semibold">
                    Water resistance level:
                  </span>
                  <span className="flex-1">{product.waterResistance}</span>
                </div>
              )}
              {product.compartments && (
                <div className="flex">
                  <span className="w-48 font-semibold">Compartments:</span>
                  <span className="flex-1">{product.compartments}</span>
                </div>
              )}
              {product.soleMaterial && (
                <div className="flex">
                  <span className="w-48 font-semibold">Sole material:</span>
                  <span className="flex-1">{product.soleMaterial}</span>
                </div>
              )}
              {product.style && (
                <div className="flex">
                  <span className="w-48 font-semibold">Style:</span>
                  <span className="flex-1">{product.style}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex">
                  <span className="w-48 font-semibold">Weight:</span>
                  <span className="flex-1">{product.weight}</span>
                </div>
              )}
              {product.careInstructions && (
                <div className="flex">
                  <span className="w-48 font-semibold">Care Instructions:</span>
                  <span className="flex-1">{product.careInstructions}</span>
                </div>
              )}
              {product.brand && (
                <div className="flex">
                  <span className="w-48 font-semibold">Brand:</span>
                  <span className="flex-1">{product.brand}</span>
                </div>
              )}
              {product.model && (
                <div className="flex">
                  <span className="w-48 font-semibold">Model:</span>
                  <span className="flex-1">{product.model}</span>
                </div>
              )}
              {product.batteryLife && (
                <div className="flex">
                  <span className="w-48 font-semibold">Battery life:</span>
                  <span className="flex-1">{product.batteryLife}</span>
                </div>
              )}
              {product.connectivity && (
                <div className="flex">
                  <span className="w-48 font-semibold">Connectivity:</span>
                  <span className="flex-1">{product.connectivity}</span>
                </div>
              )}
              {product.displayType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Display type:</span>
                  <span className="flex-1">{product.displayType}</span>
                </div>
              )}
              {product.fabricType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Fabric type:</span>
                  <span className="flex-1">{product.fabricType}</span>
                </div>
              )}
              {product.length && (
                <div className="flex">
                  <span className="w-48 font-semibold">Length:</span>
                  <span className="flex-1">{product.length}</span>
                </div>
              )}
              {product.waistRise && (
                <div className="flex">
                  <span className="w-48 font-semibold">Waist rise:</span>
                  <span className="flex-1">{product.waistRise}</span>
                </div>
              )}
              {product.material && (
                <div className="flex">
                  <span className="w-48 font-semibold">Material:</span>
                  <span className="flex-1">{product.material}</span>
                </div>
              )}
              {product.occasion && (
                <div className="flex">
                  <span className="w-48 font-semibold">Occasion:</span>
                  <span className="flex-1">{product.occasion}</span>
                </div>
              )}
              {product.shoeType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Shoe type:</span>
                  <span className="flex-1">{product.shoeType}</span>
                </div>
              )}
              {product.strapType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Strap Type:</span>
                  <span className="flex-1">{product.strapType}</span>
                </div>
              )}
              {product.skinType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Skin Type:</span>
                  <span className="flex-1">{product.skinType}</span>
                </div>
              )}
              {product.hairType && (
                <div className="flex">
                  <span className="w-48 font-semibold">Hair Type:</span>
                  <span className="flex-1">{product.hairType}</span>
                </div>
              )}
              {product.ingredients && (
                <div className="flex items-start">
                  <span className="w-48 font-semibold shrink-0">
                    Ingredients:
                  </span>
                  <span className="whitespace-pre-wrap break-words">
                    {product.ingredients.join(", ")}
                  </span>
                </div>
              )}
              {product.scent && (
                <div className="flex">
                  <span className="w-48 font-semibold">Scent:</span>
                  <span className="flex-1">{product.scent}</span>
                </div>
              )}
              {product.gender && (
                <div className="flex">
                  <span className="w-48 font-semibold">Gender:</span>
                  <span className="flex-1">{product.gender}</span>
                </div>
              )}
              {product.applicationArea && (
                <div className="flex">
                  <span className="w-48 font-semibold">Application Area:</span>
                  <span className="flex-1">{product.applicationArea}</span>
                </div>
              )}
              {product.form && (
                <div className="flex">
                  <span className="w-48 font-semibold">Form:</span>
                  <span className="flex-1">{product.form}</span>
                </div>
              )}

              {/* Always shown */}
              <div className="flex">
                <span className="w-48 font-semibold">Country of Origin:</span>
                <span className="flex-1">{product.origin || "India"}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CENTER IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative flex flex-col items-center justify-center"
        >
          {/* Outer ring */}
          <div
            className="absolute w-[280px] sm:w-[310px] aspect-square rounded-full border-4 border-gray-300 dark:border-gray-500 z-0 pointer-events-none"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 40%, black 60%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 40%, black 60%, transparent)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          {/* IMAGE CIRCLE */}
          <div className="relative">
            {/* Badge */}
            <AnimatePresence>
              {product.badge && (
                <motion.div
                  initial={{ y: -10, scale: 0.5, opacity: 0 }}
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                      delay: 0.5,
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute z-20"
                >
                  <BadgeRibbon
                    badge={product.badge}
                    className="rounded-sm whitespace-nowrap px-2 py-1 min-w-max inline-block text-xs sm:text-sm font-bold text-black"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image */}
            <div className="w-[250px] sm:w-[280px] aspect-square rounded-full bg-white dark:bg-gray-800 shadow-xl overflow-hidden flex items-center justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="max-w-[60%] max-h-[60%] object-contain"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* PRICE BELOW IMAGE */}
          <div className="absolute bottom-4 flex items-center mt-4 z-20">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {price}
            </span>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-5"
        >
          {/* Ratings */}
          <div className="flex items-center gap-1 text-yellow-400">
            <span className="text-black dark:text-white font-semibold mr-1">
              Review :
            </span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                fill={index < Math.floor(product.rating) ? "orange" : "none"}
                strokeWidth={1}
                className="border-yellow-200 dark:border-yellow-400"
              />
            ))}
            <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Color */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-black dark:text-white">
              Color :
            </span>
            {product.colors?.map((color, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedColor(color)}
                className={`relative w-5 h-5 rounded-full border cursor-pointer transition-all
                            ${
                              selectedColor === color
                                ? "ring-1 ring-offset-2 ring-gray-800 dark:ring-gray-900"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                style={{ backgroundColor: color }}
              >
                {/* Animate circle */}
                <AnimatePresence>
                  {selectedColor === color && (
                    <motion.div
                      layoutId="selectedColor"
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      exit={{ opacity: 0 }}
                      style={{ backgroundColor: color }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center relative">
              <span className="font-semibold text-black dark:text-white">
                Size :
              </span>
              {product.sizes.map((size, i) => (
                <motion.span
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  initial={false}
                  animate={{
                    scale: selectedSize === size ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative min-w-[2.5rem] h-10 px-2 flex items-center justify-center text-sm border rounded-md cursor-pointer
                              ${
                                selectedSize === size
                                  ? "bg-gray-800 text-white dark:bg-white dark:text-black border-gray-800 dark:border-white"
                                  : "border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200/30 dark:hover:bg-gray-700/30"
                              }`}
                >
                  {size}
                  {/* Highlight animation */}
                  <AnimatePresence>
                    {selectedSize === size && (
                      <motion.div
                        layoutId="selectedSize"
                        className="absolute inset-0 -z-10 rounded-md bg-gray-800 dark:bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.span>
              ))}
            </div>
          )}

          {/* Size Guide */}
          {product?.sizes?.length > 1 && (
            <button
              onClick={() => setShowSizeGuide(true)}
              className="text-sm text-pink-600 dark:text-pink-500 hover:underline cursor-pointer flex"
            >
              {t("card.findMySize")}
            </button>
          )}
          {showSizeGuide && (
            <SizeGuideModal
              onClose={() => setShowSizeGuide(false)}
              product={product}
            />
          )}

          {/* In Stock */}
          <p
            className={`text-sm font-medium ${
              product.inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
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
                  ? "overflow-hidden flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 font-bold rounded-lg shadow-md transition cursor-pointer text-center whitespace-nowrap"
                  : "overflow-hidden flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 font-bold rounded-lg shadow-md transition text-center whitespace-nowrap cursor-no-drop opacity-60"
              }`}
            >
              {t("card.addToCart")}
            </Button>
            <Button
              onClick={() => handleBuyNow(product)}
              className={`p-2 rounded-full shadow transition-all ${
                product.inStock
                  ? "overflow-hidden flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg shadow-md transition cursor-pointer text-center whitespace-nowrap"
                  : "overflow-hidden flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg shadow-md transition text-center whitespace-nowrap cursor-no-drop opacity-60"
              }`}
            >
              {t("card.buyNow")}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetailsPage;
