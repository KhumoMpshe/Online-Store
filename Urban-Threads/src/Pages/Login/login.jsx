import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/cart");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <input
        className="login-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"

        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="login-links">
        <Link to="/forgot-password" className="forgot-link">
          Forgot password?
        </Link>

        <Link to="/signup" className="forgot-link">
          Don't have an account? Sign up
        </Link>
      </div>

      <button className="login-button" onClick={login}>
        Login
      </button>
    </div>
  );
}