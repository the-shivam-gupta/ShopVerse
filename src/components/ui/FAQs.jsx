import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

function FAQs() {
  const { t } = useTranslation();

  const faqData = [
    {
      key: "shipping",
      question: t("faq.shipping"),
      answer: t("faq.shippingAnswer"),
    },
    {
      key: "return",
      question: t("faq.return"),
      answer: t("faq.returnAnswer"),
    },
    {
      key: "support",
      question: t("faq.support"),
      answer: t("faq.supportAnswer"),
    },
    {
      key: "payment",
      question: t("faq.payment"),
      answer: t("faq.paymentAnswer"),
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="w-full min-h-screen py-16 px-4 md:px-8 bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-500 mb-10">
          {t("faq.title")}
        </h2>

        <div className="space-y-6">
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
                  <span>{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-pink-300"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    scaleY: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                  className={`px-6 text-sm text-gray-700 dark:text-gray-300 origin-top overflow-hidden ${
                    isOpen ? "pb-4 ml-2" : "h-0"
                  }`}
                >
                  {faq.answer}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FAQs;
