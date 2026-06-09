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

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cart.map((item, i) => (
        <div key={i} className="cart-item">
          <h4>{item.name}</h4>
          <p>Qty: {item.qty}</p>
          <p>${item.price}</p>
          <button onClick={() => removeItem(i)}>Remove</button>
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}