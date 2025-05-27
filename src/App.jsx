import Home from "./components/Home";
import "./index.css";
import { useState } from "react";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import { CartProvider } from "./components/context/CartContext";
import AppRouter from "./Router";
import ScrollToTop from "./components/ui/ScrollToTop";
import { CompareProvider } from "./components/context/CompareContext";

function App() {
  const [currency, setCurrency] = useState("USD");

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <CartProvider>
          <CompareProvider>
            <FavoritesProvider>
              <AppRouter currency={currency} setCurrency={setCurrency} />
              <ScrollToTop />
            </FavoritesProvider>
          </CompareProvider>
        </CartProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
