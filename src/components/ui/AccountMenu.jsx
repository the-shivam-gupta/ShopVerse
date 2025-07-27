import {
  LogOut,
  User,
  ShoppingBag,
  Lock,
  Bookmark,
  HelpCircle,
  Wallet,
  Star,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "/src/firebase";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AccountMenu = ({ user }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative user-dropdown">
      <img
        src={user.photoURL || "/src/assets/default-avatar.jpeg"}
        alt="Profile"
        loading="lazy"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full border-2 border-gray-200 dark:border-gray-600 cursor-pointer hover:ring-2 hover:ring-pink-400 transition"
      />

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-center p-5 z-50"
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 rotate-45 border-l border-t border-gray-200 dark:border-gray-700 z-0" />

            {/* Name/Email */}
            <p className="font-medium text-gray-800 dark:text-gray-100 text-sm mb-3 break-words">
              {user.displayName || user.email || "My Account"}
            </p>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1 text-sm">
              <button
                onClick={() => {
                  navigate("/profile/info");
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition cursor-pointer"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={() => {
                  navigate("/profile/orders");
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition cursor-pointer"
              >
                <ShoppingBag size={16} /> My Orders
              </button>
              <button
                onClick={() => {
                  navigate("/profile/wallet");
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition cursor-pointer"
              >
                <Wallet size={16} /> My Wallet
              </button>
              <button
                onClick={() => {
                  navigate("/profile/rewards");
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition cursor-pointer"
              >
                <Star size={16} /> Rewards
              </button>

              <button
                onClick={() => {
                  navigate("/profile/help");
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition cursor-pointer"
              >
                <HelpCircle size={16} />  Support
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                signOut(auth);
                setDropdownOpen(false);
              }}
              className="mt-4 w-full py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <LogOut size={16} /> Logout
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountMenu;
