import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const successMessageVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const ContactUs = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  // Separate state for each field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        createdAt: Timestamp.now(),
      });

      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 3000);
      setName("");
      setEmail("");
      setMessage("");
      setFocus({ name: false, email: false, message: false });
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const floatingStyle = (field) =>
    focus[field] ||
    (field === "name" ? name : field === "email" ? email : message).length > 0;

  return (
    <div className="w-full h-[100dvh] dark:bg-gray-800">
      <motion.div
        className="max-w-3xl mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-400"
          variants={childVariants}
        >
          {t("contact.contactUs")}
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-500 rounded-xl p-10 space-y-6"
          variants={childVariants}
        >
          {/* Name Field */}
          <div className="relative">
            <motion.label
              animate={{
                top: floatingStyle("name") ? "-0.8rem" : "0.75rem",
                left: "1rem",
                fontSize: floatingStyle("name") ? "0.9rem" : "1rem",
                scale: floatingStyle("name") ? 0.85 : 1,
                color: floatingStyle("name") ? "#ec4899" : "#A9A9A9",
                padding: floatingStyle("name") ? "0 0.25rem" : "0",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bg-white dark:bg-gray-700 px-1 pointer-events-none"
            >
              {t("contact.name")}
            </motion.label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocus({ ...focus, name: true })}
              onBlur={() => setFocus({ ...focus, name: false })}
              className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <motion.label
              animate={{
                top: floatingStyle("email") ? "-0.8rem" : "0.75rem",
                left: "1rem",
                fontSize: floatingStyle("email") ? "0.9rem" : "1rem",
                scale: floatingStyle("email") ? 0.85 : 1,
                color: floatingStyle("email") ? "#ec4899" : "#A9A9A9",
                padding: floatingStyle("email") ? "0 0.25rem" : "0",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bg-white dark:bg-gray-700 px-1 pointer-events-none"
            >
              {t("contact.email")}
            </motion.label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocus({ ...focus, email: true })}
              onBlur={() => setFocus({ ...focus, email: false })}
              className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
            />
          </div>

          {/* Message Field */}
          <div className="relative">
            <motion.label
              animate={{
                top: floatingStyle("message") ? "-0.8rem" : "0.75rem",
                left: "1rem",
                fontSize: floatingStyle("message") ? "0.9rem" : "1rem",
                scale: floatingStyle("message") ? 0.85 : 1,
                color: floatingStyle("message") ? "#ec4899" : "#A9A9A9",
                padding: floatingStyle("message") ? "0 0.25rem" : "0",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bg-white dark:bg-gray-700 px-1 pointer-events-none"
            >
              {t("contact.message")}
            </motion.label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFocus({ ...focus, message: true })}
              onBlur={() => setFocus({ ...focus, message: false })}
              className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
            />
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-pink-400 text-white px-6 py-2 rounded-md font-medium shadow hover:bg-pink-500 transition-all cursor-pointer w-1/3"
            >
              {t("contact.sendMessage")}
            </motion.button>
          </div>
        </motion.form>

        <AnimatePresence>
          {submitted && (
            <motion.div
              className="fixed bottom-4 right-4 bg-gray-50 border border-gray-100 text-green-600 shadow-lg p-5 rounded-md font-medium z-50"
              variants={successMessageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {t("contact.messageSentSuccessfully")}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ContactUs;
