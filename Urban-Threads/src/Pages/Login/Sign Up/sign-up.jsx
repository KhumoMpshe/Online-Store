import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

import "./sign-up.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (name && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      navigate("/cart");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>

      <input
        className="signup-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="signup-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="signup-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link to="/login" className="forgot-link">
        Already have an account? Login
      </Link>

      <button className="signup-button" onClick={signup}>
        Sign Up
      </button>
    </div>
  );
}
