import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plus, Truck, RotateCcw, HelpCircle, CreditCard } from "lucide-react";
import { Button } from "./Button";

function FAQs() {
  const { t } = useTranslation();

  const faqData = [
    {
      key: "shipping",
      question: t("faq.shipping"),
      answer: t("faq.shippingAnswer"),
      icon: <Truck className="w-5 h-5 mr-3 text-pink-400" />,
    },
    {
      key: "return",
      question: t("faq.return"),
      answer: t("faq.returnAnswer"),
      icon: <RotateCcw className="w-5 h-5 mr-3 text-pink-400" />,
    },
    {
      key: "support",
      question: t("faq.support"),
      answer: t("faq.supportAnswer"),
      icon: <HelpCircle className="w-5 h-5 mr-3 text-pink-400" />,
    },
    {
      key: "payment",
      question: t("faq.payment"),
      answer: t("faq.paymentAnswer"),
      icon: <CreditCard className="w-5 h-5 mr-3 text-pink-400" />,
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="w-full min-h-screen py-16 px-4 md:px-8 bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
      {/* Title and Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">
          {t("faq.title")}
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("faq.subtitle")}
        </p>
      </motion.div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t("faq.needHelp")}
          </p>
          <h3 className="text-xl font-semibold mb-2">
            {t("faq.haveQuestions")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t("faq.helpText")}
          </p>
          <Button className="bg-pink-500 rounded hover:bg-pink-600 transition cursor-pointer">
            {t("faq.contactBtn")}
          </Button>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-4 focus:outline-none font-medium flex justify-between items-center cursor-pointer"
                >
                  <span className="flex items-center">
                    {faq.icon}
                    {t(faq.question)}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-pink-400"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="faq-content"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="px-6 pb-4 ml-2 text-sm text-gray-700 dark:text-gray-300 origin-top overflow-hidden"
                    >
                      {t(faq.answer)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default FAQs;
