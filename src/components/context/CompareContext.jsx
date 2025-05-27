import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.name === product.name)) return prev;
      if (prev.length >= 2) return prev;
      return [...prev, product];
    });
    setIsCompareOpen(true);
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, isCompareOpen, addToCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
