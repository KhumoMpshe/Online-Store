import { useAuth } from "../../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "./navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
        <h1><a href="/" className="nav-link">Urban Threads</a></h1>
    
        <div className="nav-right">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/cart">Cart</Link>
            </div>

            <div className="user">
                {user ? (
                    <>
                        <span>{user.email}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">
                        <span className="material-icons">person</span>
                    </Link>
                )}
            </div>
        </div>
        
    </nav>
  );
}