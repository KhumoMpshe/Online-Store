import Navbar from "./components/Navbar/navbar";
import react from "react";
import Home from "./pages/Home/home.jsx";
import Shop from "./pages/Shop/shop";
import ShopCategory from "./pages/Shop/ShopCategory";
import Cart from "./pages/Cart/cart";
import Login from "./pages/Login/login";
import SignUp from "./pages/Login/Sign Up/sign-up";
import Password from "./pages/Login/Password/password";

import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="content">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<ShopCategory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<Password />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
