import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../../components/Product/product";
import "./shop.css";

const collections = [
  { slug: "accessories", label: "Accessories", imageURL: "https://images.unsplash.com/photo-1777223128040-c3552d6cd1ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGFjY2Vzc29yaWVzJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"},
  { slug: "hoodies", label: "Hoodies", imageURL: "https://images.unsplash.com/photo-1526476148966-98bd039463ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvb2RpZXN8ZW58MHx8MHx8fDA%3D" },
  { slug: "shirts", label: "Shirts", imageURL: "https://plus.unsplash.com/premium_photo-1688497831503-235238709bd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHQtc2hpcnRzfGVufDB8fDB8fHww"},
  { slug: "sneakers", label: "Sneakers", imageURL: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM0fHxTbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D" },
];

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("search")?.trim().toLowerCase() || "";
  const [searchProducts, setSearchProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filteredCollections = query
    ? collections.filter((collection) =>
        collection.label.toLowerCase().includes(query)
      )
    : collections;

  const filteredProducts = searchProducts.filter((product) => {
    const name = (product.Name || product.name || product.title || "").toString().toLowerCase();
    const description = (product.Description || product.description || product.desc || "").toString().toLowerCase();
    return name.includes(query) || description.includes(query);
  });

  useEffect(() => {
    if (!query) {
      setSearchProducts([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const allProducts = [];
        for (const collectionInfo of collections) {
          const snap = await getDocs(collection(db, collectionInfo.label));
          const docs = snap.docs.map((doc) => ({
            id: doc.id,
            collection: collectionInfo.label,
            ...doc.data(),
          }));
          allProducts.push(...docs);
        }
        setSearchProducts(allProducts);
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="shop shop-collections">
      <h2>{query ? `Search results for "${query}"` : "Collections"}</h2>
      <p>
        {query
          ? `Search all items across collections.`
          : "Choose a collection to browse all products in that category."}
      </p>

      {query ? (
        <>
          {loading && <p>Searching products…</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {!loading && filteredProducts.length === 0 && (
            <p>No items matched "{query}".</p>
          )}
          <div className="grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={(item) => {
                  const cart = JSON.parse(localStorage.getItem("cart")) || [];
                  const existing = cart.find((cartItem) => cartItem.id === item.id);
                  if (existing) {
                    existing.qty += 1;
                  } else {
                    cart.push({ ...item, qty: 1 });
                  }
                  localStorage.setItem("cart", JSON.stringify(cart));
                  alert("Added to cart");
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="collections">
          {filteredCollections.map((collection) => (
            <Link
              key={collection.slug}
              to={`/shop/${collection.slug}`}
              className="collection-card"
            >
              <img src={collection.imageURL} alt={collection.label} />
              <span>{collection.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
