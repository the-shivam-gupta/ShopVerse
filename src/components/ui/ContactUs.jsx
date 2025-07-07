import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Button } from "./Button";
import { Mail, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

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

const successMessageVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const ContactUs = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    orderId: "",
    message: "",
  });

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    message: false,
    orderId: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: Timestamp.now(),
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({
        name: "",
        email: "",
        subject: "general",
        orderId: "",
        message: "",
      });
      setFocus({ name: false, email: false, message: false });
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const floatingStyle = (field) =>
    focus[field] || form[field].trim().length > 0;

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-black">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-pink-500">
          {t("contact.contactUs")}
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-6 sm:my-10" />

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {t("contact.getInTouch")}
              </h3>
              <p className="text-sm">{t("contact.description")}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-pink-500" />
              <span>support@shopverse.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-pink-500" />
              <span>+91 9326257600</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-pink-500" />
              <span>{t("contact.workingHours")}</span>
            </div>
            <Link
              to="/faqs"
              className="text-pink-500 underline hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              {t("contact.faqLink")}
            </Link>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6"
          >
            {/* Name Field */}
            <div className="relative">
              <motion.label
                initial={{
                  top: "0.75rem",
                  left: "1rem",
                  fontSize: "1rem",
                  scale: 1,
                  color: "#A9A9A9",
                }}
                animate={{
                  top: floatingStyle("name") ? "-0.8rem" : "0.75rem",
                  left: "1rem",
                  fontSize: floatingStyle("name") ? "0.9rem" : "1rem",
                  scale: floatingStyle("name") ? 0.85 : 1,
                  color: floatingStyle("name") ? "#ec4899" : "#A9A9A9",
                  padding: floatingStyle("name") ? "0 0.25rem" : "0",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute bg-gray-50 dark:bg-gray-700 px-1 pointer-events-none"
              >
                {t("contact.name")}
              </motion.label>
              <input
                type="text"
                autoComplete="off"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocus({ ...focus, name: true })}
                onBlur={() => setFocus({ ...focus, name: false })}
                className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <motion.label
                initial={{
                  top: "0.75rem",
                  left: "1rem",
                  fontSize: "1rem",
                  scale: 1,
                  color: "#A9A9A9",
                }}
                animate={{
                  top: floatingStyle("email") ? "-0.8rem" : "0.75rem",
                  left: "1rem",
                  fontSize: floatingStyle("email") ? "0.9rem" : "1rem",
                  scale: floatingStyle("email") ? 0.85 : 1,
                  color: floatingStyle("email") ? "#ec4899" : "#A9A9A9",
                  padding: floatingStyle("email") ? "0 0.25rem" : "0",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute bg-gray-50 dark:bg-gray-700 px-1 pointer-events-none"
              >
                {t("contact.email")}
              </motion.label>
              <input
                type="email"
                autoComplete="new-email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocus({ ...focus, email: true })}
                onBlur={() => setFocus({ ...focus, email: false })}
                className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
              />
            </div>

            {/* Order ID */}
            <div className="relative">
              <motion.label
                initial={{
                  top: "0.75rem",
                  left: "1rem",
                  fontSize: "1rem",
                  scale: 1,
                  color: "#A9A9A9",
                }}
                animate={{
                  top: floatingStyle("orderId") ? "-0.8rem" : "0.75rem",
                  left: "1rem",
                  fontSize: floatingStyle("orderId") ? "0.9rem" : "1rem",
                  scale: floatingStyle("orderId") ? 0.85 : 1,
                  color: floatingStyle("orderId") ? "#ec4899" : "#A9A9A9",
                  padding: floatingStyle("orderId") ? "0 0.25rem" : "0",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute bg-gray-50 dark:bg-gray-700 dark:bg-opacity-70 px-1 pointer-events-none"
              >
                {t("contact.orderId")} ({t("contact.optional")})
              </motion.label>

              <input
                type="text"
                name="orderId"
                value={form.orderId}
                onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                onFocus={() => setFocus({ ...focus, orderId: true })}
                onBlur={() => setFocus({ ...focus, orderId: false })}
                className="w-full border border-gray-300 dark:border-gray-500 dark:text-white dark:bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
              />
            </div>

            {/* Subject dropdown */}
            <div>
              <select
                name="subject"
                value={form.subject}
                required
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-500 dark:text-gray-300 text-gray-600 dark:bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400 cursor-pointer"
              >
                <option value="" disabled hidden>
                  {t("contact.selectSubject")}
                </option>
                <option value={t("contact.returnRefund")}>
                  {t("contact.returnRefund")}
                </option>
                <option value={t("contact.orderIssue")}>
                  {t("contact.orderIssue")}
                </option>
                <option value={t("contact.productInquiry")}>
                  {t("contact.productInquiry")}
                </option>
                <option value={t("contact.generalQuery")}>
                  {t("contact.generalQuery")}
                </option>
              </select>
            </div>

            {/* Message Field */}
            <div className="relative">
              <motion.label
                initial={{
                  top: "0.75rem",
                  left: "1rem",
                  fontSize: "1rem",
                  scale: 1,
                  color: "#A9A9A9",
                }}
                animate={{
                  top: floatingStyle("message") ? "-0.8rem" : "0.75rem",
                  left: "1rem",
                  fontSize: floatingStyle("message") ? "0.9rem" : "1rem",
                  scale: floatingStyle("message") ? 0.85 : 1,
                  color: floatingStyle("message") ? "#ec4899" : "#A9A9A9",
                  padding: floatingStyle("message") ? "0 0.25rem" : "0",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute bg-gray-50 dark:bg-gray-700 px-1 pointer-events-none"
              >
                {t("contact.message")}
              </motion.label>
              <textarea
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocus({ ...focus, message: true })}
                onBlur={() => setFocus({ ...focus, message: false })}
                className="w-full border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 caret-pink-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-500 py-2 rounded-md hover:bg-pink-600 cursor-pointer"
            >
              {t("contact.sendMessage")}
            </Button>
          </form>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-green-600 shadow-lg p-5 rounded-md font-medium z-50"
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
