import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 200); // write after 200ms
    return () => clearTimeout(timeout);
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const alreadyExists = prev.some((item) => item.name === product.name);
      if (alreadyExists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productName) => {
    setCart((prev) => prev.filter((item) => item.name !== productName));
  }, []);

  const addToCartAtIndex = useCallback((item, index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 0, item);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      setCart,
      addToCartAtIndex,
    }),
    [cart, addToCart, removeFromCart, clearCart, addToCartAtIndex]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
