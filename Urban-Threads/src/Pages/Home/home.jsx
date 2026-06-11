import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
        <header className="hero">
            <h1>Urban Threads</h1>

            <p>
                Trendy streetwear for young adults.
                Explore our latest collection of hoodies,
                t-shirts, sneakers, and accessories.
            </p>

            <div className="hero-buttons">
                <Link to="/shop">
                    <button className="btn">Shop Now</button>
                </Link>
            </div>
        </header>
    </div>
  );
}

export default Home;