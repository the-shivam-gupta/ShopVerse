export function Button({ children, className = "", variant = "default", ...props }) {
    const baseStyle = "rounded-full px-6 py-2 font-semibold transition";
    
    const variants = {
      default: "bg-gray-800 text-white hover:bg-gray-700",
      link: "text-pink-500 hover:underline bg-transparent p-0",
    };
  
    return (
      <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  