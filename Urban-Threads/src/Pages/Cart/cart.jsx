import { useState, useEffect } from "react";
import "../Cart/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getItemName = (item) => item.Name || item.name || "Unknown product";
  const getItemPrice = (item) => item.Price ?? item.price ?? 0;

  const total = cart.reduce((sum, item) => sum + getItemPrice(item) * item.qty, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="cart-item">
              <div className="item-name">{getItemName(item)}</div>
              <div className="item-qty">Qty: {item.qty}</div>
              <div className="item-price">R{getItemPrice(item).toFixed(2)}</div>
              <button onClick={() => removeItem(i)} className="item-remove">Remove</button>
            </div>
          ))}

          <h3>Total: R{total.toFixed(2)}</h3>
          {cart.length > 0 && (
            <button className="checkout-button" onClick={() => alert("Checkout not implemented")}>
              Proceed to Checkout
            </button>
          )}
        </>
      )}
    </div>
  );
}