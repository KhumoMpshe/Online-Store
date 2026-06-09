import Navbar from "./components/Navbar/navbar";
import react from "react";
import Home from "./pages/Home/home.jsx";
import Shop from "./pages/Shop/shop";
import Cart from "./pages/Cart/cart";
import Login from "./pages/Login/login";

import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="content">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />

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
    </div>
  );
}

export default App;
