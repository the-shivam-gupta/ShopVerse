import { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Button } from "./Button";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState({ email: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const floatingStyle = (field) => focus[field] || email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Promise.all([
        addDoc(collection(db, "newsletter_subscribers"), {
          email,
          timestamp: Timestamp.now(),
        }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("Error saving to Firestore", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-sm self-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white backdrop-blur-md p-4 sm:p-5 shadow-lg dark:bg-gray-700 relative isolate">
      {/* Background Blurs */}
      <div className="absolute -bottom-3 -right-3 sm:-bottom-10 sm:-right-10 w-16 h-16 bg-pink-500/20 rounded-full blur-2xl z-0"></div>
      <div className="absolute -top-3 -left-3 sm:-top-10 sm:-left-10 w-16 h-16 bg-pink-500/20 rounded-full blur-2xl z-0"></div>

      <div className="relative z-10">
        <h3 className="text-sm sm:text-base text-center sm:text-left font-bold text-gray-800 dark:text-white mb-1">
          Join Our Newsletter
        </h3>
        <p className="text-xs sm:text-sm text-center sm:text-left text-gray-500 dark:text-gray-300 mb-3 leading-relaxed">
          Get exclusive deals & updates.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          >
            <div className="relative w-full">
              <motion.label
                initial={{
                  top: "0.3rem",
                  left: "1rem",
                  fontSize: "1rem",
                  color: "#A9A9A9",
                }}
                animate={{
                  top: floatingStyle("email") ? "-0.7rem" : "0.3rem",
                  left: "1rem",
                  fontSize: floatingStyle("email") ? "0.85rem" : "1rem",
                  scale: floatingStyle("email") ? 0.95 : 1,
                  color: floatingStyle("email") ? "#ec4899" : "#A9A9A9",
                  padding: floatingStyle("email") ? "0 0.25rem" : "0",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute bg-white dark:bg-gray-700 px-1 pointer-events-none"
              >
                Email
              </motion.label>

              <input
                type="email"
                value={email}
                autoComplete="new-email"
                required
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocus({ ...focus, email: true })}
                onBlur={() => setFocus({ ...focus, email: false })}
                className="w-full border border-gray-300 dark:border-gray-500 text-black dark:text-white rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400 h-9 bg-white dark:bg-gray-700 text-sm"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-1/3 px-3 py-2 rounded-md text-xs font-medium transition cursor-pointer flex items-center justify-center ${
                loading
                  ? "bg-gray-400 dark:bg-gray-600 text-white"
                  : "bg-pink-500 text-black dark:text-white hover:bg-pink-600"
              }`}
            >
              {loading ? (
                <span className="loader flex justify-center" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-start text-black dark:text-white font-semibold mt-4"
          >
            Thanks for joining! We'll keep you posted with fresh deals and
            updates.
          </motion.p>
        )}
      </div>
    </div>
  );
}
