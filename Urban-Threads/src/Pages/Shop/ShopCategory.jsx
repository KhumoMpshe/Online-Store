import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../../components/Product/product";
import "./shop.css";

const collections = [
  { slug: "accessories", label: "Accessories" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "shirts", label: "Shirts" },
  { slug: "sneakers", label: "Sneakers" },
];

export default function ShopCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionInfo = collections.find((item) => item.slug === category);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!collectionInfo) {
        setError("Collection not found.");
        setLoading(false);
        return;
      }

      try {
        const snap = await getDocs(collection(db, collectionInfo.label));
        setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionInfo]);

  if (!collectionInfo) {
    return (
      <div className="shop">
        <h2>Collection not found</h2>
        <Link to="/shop" className="collection-back">
          Back to collections
        </Link>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <div>
          <h2>{collectionInfo.label}</h2>
          <p>Browse the full {collectionInfo.label} collection.</p>
        </div>
        <Link to="/shop" className="collection-back">
          Back to collections
        </Link>
      </div>

      {loading && <p>Loading products…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={() => {
              const cart = JSON.parse(localStorage.getItem("cart")) || [];
              const existing = cart.find((item) => item.id === product.id);
              if (existing) {
                existing.qty += 1;
              } else {
                cart.push({ ...product, qty: 1 });
              }
              localStorage.setItem("cart", JSON.stringify(cart));
              alert("Added to cart");
            }}
          />
        ))}
      </div>
    </div>
  );
}
