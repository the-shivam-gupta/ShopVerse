import { useParams } from "react-router-dom";
import { products as allProducts } from "./ProductCard";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
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
  const handleAddToCart = useCallback(() => {
    const cartProduct = {
      ...product,
      image: product.mainImage,
    };
    addToCart(cartProduct);
  }, [product, addToCart]);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Images Section */}
          <div className="w-full lg:w-1/2 relative overflow-hidden rotate-2 hover:rotate-0 hover:scale-105 transition-transform">
            <div className="relative flex justify-center items-center border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg dark:shadow-gray-800 h-[400px] sm:h-[500px] bg-gray-50 dark:bg-gray-800 overflow-hidden">
              {/* ✅ Badge */}
              <BadgeRibbon
                badge={product.badge}
                className="w-[150px] top-6 -right-8 rotate-45 "
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 dark:from-white/5 dark:via-transparent dark:to-black/5 pointer-events-none z-10" />
              {/* ✅ Main Product Image */}
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={selectedImage}
                alt={product.name}
                className="w-[260px] max-h-full object-contain"
              />

              {/* ✅ Thumbnails */}
              <div className="absolute left-2 top-2 sm:left-4 sm:top-4 flex flex-col gap-2 bg-white/20 dark:bg-black/20 p-2 rounded-lg shadow-md">
                {[
                  product.mainImage,
                  product.hoverImage,
                  ...(product.images || []),
                ].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`border-2 rounded-lg overflow-hidden w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 cursor-pointer ${
                      selectedImage === img
                        ? "border-pink-500 dark:border-gray-300"
                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
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
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4">
            {/* Title and Category */}
            <div>
              <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wide mb-1">
                {t(product.category)}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                {t(product.name)}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center flex-wrap gap-3">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {price}
              </span>
              <span className="text-gray-400 dark:text-gray-400 line-through text-md">
                {originalPrice}
              </span>
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap sm:justify-start">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Color:
                </span>
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:scale-110"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap sm:justify-start">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Size:
                </span>
                {product.sizes.map((size, i) => (
                  <span
                    key={i}
                    className="min-w-[2.5rem] h-10 px-2 flex items-center justify-center text-sm border border-gray-300 rounded-md dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200/30 dark:hover:bg-gray-700/30 cursor-pointer"
                  >
                    {size}
                  </span>
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

            {/* Ratings */}
            {product.rating && (
              <div className="flex items-center justify-start text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    fill={
                      index < Math.floor(product.rating) ? "orange" : "none"
                    }
                    strokeWidth={1}
                    className="border-yellow-200 dark:border-yellow-400"
                  />
                ))}
                <span className="text-gray-700 dark:text-gray-300 text-sm sm:ml-2">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}

            {/* Stock */}
            {product.inStock !== undefined && (
              <p
                className={`text-sm font-medium ${
                  product.inStock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full ">
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

            {/* Product Info */}
            <div className="mt-6 border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
              <h1 className="text-xl font-bold mb-4">Product Details</h1>
              <div className="space-y-1 ml-2">
                {product.materialType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Material type:</span>
                    <span>{product.materialType}</span>
                  </div>
                )}
                {product.fitType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Fit type:</span>
                    <span>{product.fitType}</span>
                  </div>
                )}
                {product.sleeveType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Sleeve type:</span>
                    <span>{product.sleeveType}</span>
                  </div>
                )}
                {product.pattern && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Pattern:</span>
                    <span>{product.pattern}</span>
                  </div>
                )}
                {product.collarType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Collar type:</span>
                    <span>{product.collarType}</span>
                  </div>
                )}
                {product.closureType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Closure type:</span>
                    <span>{product.closureType}</span>
                  </div>
                )}
                {product.heelType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Heel type:</span>
                    <span>{product.heelType}</span>
                  </div>
                )}
                {product.waterResistance && (
                  <div className="flex">
                    <span className="w-48 font-semibold">
                      Water resistance level:
                    </span>
                    <span>{product.waterResistance}</span>
                  </div>
                )}
                {product.compartments && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Compartments:</span>
                    <span>{product.compartments}</span>
                  </div>
                )}
                {product.soleMaterial && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Sole material:</span>
                    <span>{product.soleMaterial}</span>
                  </div>
                )}
                {product.style && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Style:</span>
                    <span>{product.style}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Weight:</span>
                    <span>{product.weight}</span>
                  </div>
                )}
                {product.careInstructions && (
                  <div className="flex">
                    <span className="w-48 font-semibold">
                      Care Instructions:
                    </span>
                    <span>{product.careInstructions}</span>
                  </div>
                )}
                {product.brand && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                )}
                {product.model && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Model:</span>
                    <span>{product.model}</span>
                  </div>
                )}
                {product.batteryLife && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Battery life:</span>
                    <span>{product.batteryLife}</span>
                  </div>
                )}
                {product.connectivity && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Connectivity:</span>
                    <span>{product.connectivity}</span>
                  </div>
                )}
                {product.displayType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Display type:</span>
                    <span>{product.displayType}</span>
                  </div>
                )}
                {product.fabricType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Fabric type:</span>
                    <span>{product.fabricType}</span>
                  </div>
                )}
                {product.length && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Length:</span>
                    <span>{product.length}</span>
                  </div>
                )}
                {product.waistRise && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Waist rise:</span>
                    <span>{product.waistRise}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Material:</span>
                    <span>{product.material}</span>
                  </div>
                )}
                {product.occasion && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Occasion:</span>
                    <span>{product.occasion}</span>
                  </div>
                )}
                {product.shoeType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Shoe type:</span>
                    <span>{product.shoeType}</span>
                  </div>
                )}
                {product.strapType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Strap Type:</span>
                    <span>{product.strapType}</span>
                  </div>
                )}
                {product.skinType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Skin Type:</span>
                    <span>{product.skinType}</span>
                  </div>
                )}
                {product.hairType && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Hair Type:</span>
                    <span>{product.hairType}</span>
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
                    <span>{product.scent}</span>
                  </div>
                )}
                {product.gender && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Gender:</span>
                    <span>{product.gender}</span>
                  </div>
                )}
                {product.applicationArea && (
                  <div className="flex">
                    <span className="w-48 font-semibold">
                      Application Area:
                    </span>
                    <span>{product.applicationArea}</span>
                  </div>
                )}
                {product.form && (
                  <div className="flex">
                    <span className="w-48 font-semibold">Form:</span>
                    <span>{product.form}</span>
                  </div>
                )}

                {/* Always shown */}
                <div className="flex">
                  <span className="w-48 font-semibold">Country of Origin:</span>
                  <span>{product.origin || "India"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
