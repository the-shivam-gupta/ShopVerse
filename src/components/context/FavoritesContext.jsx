import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to localStorage whenever favorites change
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, 200); // or 300ms

    return () => clearTimeout(timeout);
  }, [favorites]);

  const addToFavorites = useCallback((product) => {
    setFavorites((prev) => {
      const alreadyExists = prev.some((item) => item.name === product.name);
      if (alreadyExists) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromFavorites = useCallback((productName) => {
    setFavorites((prev) => prev.filter((item) => item.name !== productName));
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
    }),
    [favorites, addToFavorites, removeFromFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
