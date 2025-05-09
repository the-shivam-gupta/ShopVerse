import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FavoritesPage from "../src/components/ui/Favorites";
import { useFavorites } from "./components/context/FavoritesContext";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import CartPage from "./components/ui/CartPage";
import { useCart } from "./components/context/CartContext";
import ProductListingPage from "./components/ui/ProductListingPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import ContactUs from "./components/ui/ContactUs";
import AboutUs from "./components/ui/AboutUs";

const AppRouter = ({ currency, setCurrency }) => {
  const { favorites } = useFavorites();
  const { cart, setCart } = useCart();
  return (
    <Router>
      <ScrollToTop />
      <Header
        currency={currency}
        setCurrency={setCurrency}
        favoriteCount={favorites.length}
        cartCount={cart.length}
        favorites={favorites}
      />
      <main className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currency={currency}
                setCurrency={setCurrency}
                favorites={favorites}
                cartCount={cart.length}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                cartCount={cart.length}
                currency={currency}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cart}
                setCart={setCart}
                currency={currency}
              />
            }
          />
          <Route
            path="/products"
            element={<ProductListingPage currency={currency} />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRouter;
