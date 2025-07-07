import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const isClothingCategory = (category) => {
  const clothingCategories = [
    "shirt",
    "tshirt",
    "dress",
    "top",
    "jacket",
    "hoodie",
    "kurta",
    "sweater",
    "blazer",
    "cardigan",
    "printedshirt",
    "denimshirt",
    "formalshirt",
    "coat",
    "casualshirt",
    "vest",
    "oversizeshirt",
    "shorts",
    "skirt",
  ];
  return clothingCategories.includes(category?.toLowerCase());
};

const SizeGuideModal = ({ onClose, product }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitPreference, setFitPreference] = useState("regular");
  const { t } = useTranslation();
  const [focus, setFocus] = useState({ height: false, weight: false });

  const floatingStyle = (field) =>
    focus[field] || (field === "height" ? height : weight);

  const rawCategory = product?.category?.split(".").pop()?.toLowerCase();

  const calculateSize = () => {
    const h = parseInt(height);
    const w = parseInt(weight);

    // ✅ Check inputs
    if (!h || !w || h <= 0 || w <= 0) {
      toast.error("Please enter valid height and weight.");
      return;
    }

    const sizes = product.sizes || [];

    if (sizes.length === 1) {
      toast.success(`✅ Recommended Size: ${sizes[0]}`);
      return;
    }

    let recommended = "";

    switch (product.category.toLowerCase()) {
      case "shirt":
      case "tshirt":
      case "dress":
      case "top":
        // Recommend based on weight/height for clothes
        if (w < 50 || h < 160) recommended = "XS";
        else if (w < 60 || h < 170) recommended = "S";
        else if (w < 75 || h < 180) recommended = "M";
        else if (w < 85 || h < 190) recommended = "L";
        else recommended = "XL";
        break;

      case "jeans":
      case "trousers":
      case "bottoms":
        // Recommend waist size
        if (w < 50) recommended = "30";
        else if (w < 60) recommended = "32";
        else if (w < 75) recommended = "34";
        else recommended = "36";
        break;

      case "rings":
        // Assume hand size based on weight
        if (w < 50) recommended = "6";
        else if (w < 60) recommended = "7";
        else if (w < 70) recommended = "8";
        else recommended = "9";
        break;

      default:
        recommended = sizes[0]; // fallback to first size
    }

    if (isClothingCategory(rawCategory) && fitPreference === "loose") {
      const currentIndex = sizes.indexOf(recommended);
      if (currentIndex !== -1 && currentIndex < sizes.length - 1) {
        recommended = sizes[currentIndex + 1];
      }
    }

    // Ensure it's in the actual sizes list
    const validSize = sizes.includes(recommended)
      ? recommended
      : sizes[sizes.length - 1];

    toast.success(`Recommended Size: ${validSize}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-3 right-3 dark:text-gray-300 cursor-pointer"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">AI Size Guide</h2>
        <div className="space-y-4">
          <div className="relative">
            <motion.label
              initial={{
                top: "0.75rem",
                left: "0.5rem",
                fontSize: "1rem",
                scale: 1,
                color: "#A9A9A9",
                padding: "0",
              }}
              animate={{
                top: floatingStyle("height") ? "-0.8rem" : "0.75rem",
                left: "0.5rem",
                fontSize: floatingStyle("height") ? "0.9rem" : "1rem",
                scale: floatingStyle("height") ? 0.85 : 1,
                color: floatingStyle("height") ? "#ec4899" : "#A9A9A9",
                padding: floatingStyle("height") ? "0 0.25rem" : "0",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bg-white dark:bg-gray-900 px-1 pointer-events-none"
            >
              Height (cm)
            </motion.label>
            <input
              type="number"
              min="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onFocus={() => setFocus({ ...focus, height: true })}
              onBlur={() => setFocus({ ...focus, height: false })}
              className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
            />
          </div>

          <div className="relative mt-4">
            <motion.label
              initial={{
                top: "0.75rem",
                left: "0.5rem",
                fontSize: "1rem",
                scale: 1,
                color: "#A9A9A9",
                padding: "0",
              }}
              animate={{
                top: floatingStyle("weight") ? "-0.8rem" : "0.75rem",
                left: "0.5rem",
                fontSize: floatingStyle("weight") ? "0.9rem" : "1rem",
                scale: floatingStyle("weight") ? 0.85 : 1,
                color: floatingStyle("weight") ? "#ec4899" : "#A9A9A9",
                padding: floatingStyle("weight") ? "0 0.25rem" : "0",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bg-white dark:bg-gray-900 px-1 pointer-events-none"
            >
              Weight (kg)
            </motion.label>
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onFocus={() => setFocus({ ...focus, weight: true })}
              onBlur={() => setFocus({ ...focus, weight: false })}
              className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
            />
          </div>

          {isClothingCategory(rawCategory) && (
            <div>
              <label className="text-sm">Fit Preference</label>
              <select
                value={fitPreference}
                onChange={(e) => setFitPreference(e.target.value)}
                className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
              >
                <option value="regular">Regular</option>
                <option value="slim">Slim</option>
                <option value="loose">Loose</option>
              </select>
            </div>
          )}

          <Button
            onClick={calculateSize}
            className="w-full bg-pink-500 dark:text-white text-black mt-2 rounded hover:bg-pink-600 cursor-pointer"
          >
            Get Recommendation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
