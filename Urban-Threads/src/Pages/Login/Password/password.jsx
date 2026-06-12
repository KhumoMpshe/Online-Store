import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

import "./password.css";

export default function Password() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const reset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="password">
      <h2>Reset Password</h2>

      <input
        className="password-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Link to="/login" className="forgot-link">
        Back to login
      </Link>

      <button className="password-button" onClick={reset}>
        Send reset email
      </button>
    </div>
  );
}
