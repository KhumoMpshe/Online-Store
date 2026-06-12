import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "./navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/shop")) {
      const params = new URLSearchParams(location.search);
      setSearchQuery(params.get("search") || "");
    }
  }, [location.pathname, location.search]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    const trimmed = value.trim();
    const basePath = location.pathname.startsWith("/shop") ? location.pathname : "/shop";
    const nextPath = trimmed ? `${basePath}?search=${encodeURIComponent(trimmed)}` : basePath;
    navigate(nextPath, { replace: true });
  };

  return (
    <nav className="navbar">
        <h1><a href="/" className="nav-link">Urban Threads</a></h1>
        
        <div className="search-bar">
            <span className="material-icons search-icon">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
        </div>

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