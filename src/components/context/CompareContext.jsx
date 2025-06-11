import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = useCallback((product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.name === product.name)) return prev;
      if (prev.length >= 2) return prev;
      return [...prev, product];
    });
    setIsCompareOpen(true);
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    setIsCompareOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      compareList,
      isCompareOpen,
      addToCompare,
      clearCompare,
    }),
    [compareList, isCompareOpen, addToCompare, clearCompare]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
