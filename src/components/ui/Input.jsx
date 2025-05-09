export function Input({ className = "", ...props }) {
    return (
      <input
        className={`border rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300 ${className}`}
        {...props}
      />
    );
  }
  