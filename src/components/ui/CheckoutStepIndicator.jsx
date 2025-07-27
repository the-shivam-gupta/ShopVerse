import { CheckCircle } from "lucide-react";
import clsx from "clsx";

const steps = [
  { label: "Your Cart", step: 1 },
  { label: "Checkout Details", step: 2 },
  { label: "Order Complete", step: 3 },
];

const CheckoutStepIndicator = ({ currentStep }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-4 xs:gap-6 py-6 md:py-10 flex-wrap">
      {steps.map(({ label, step }, index) => {
        const isActive = currentStep === step;
        const isCompleted = currentStep > step;

        return (
          <div
            key={step}
            className="flex flex-col xs:flex-row items-center gap-2"
          >
            <div
              className={clsx(
                "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 font-medium shrink-0",
                {
                  "bg-pink-500 text-white border-pink-500": isActive,
                  "bg-white border-gray-300 text-gray-400 dark:bg-gray-900":
                    !isActive && !isCompleted,
                  "bg-green-500 border-green-500 text-white": isCompleted,
                }
              )}
            >
              {isCompleted ? <CheckCircle size={16} /> : step}
            </div>
            <span
              className={clsx("text-xs sm:text-sm font-medium", {
                "text-pink-500": isActive,
                "text-gray-400 dark:text-gray-500": !isActive && !isCompleted,
                "text-green-600": isCompleted,
              })}
            >
              {label}
            </span>
            {index !== steps.length - 1 && (
              <div className="hidden sm:block w-8 h-px bg-gray-300 dark:bg-gray-700 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutStepIndicator;
