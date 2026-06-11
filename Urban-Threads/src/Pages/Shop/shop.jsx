import { Link } from "react-router-dom";
import "./shop.css";

const collections = [
  { slug: "accessories", label: "Accessories", imageURL: "https://images.unsplash.com/photo-1777223128040-c3552d6cd1ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGFjY2Vzc29yaWVzJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"},
  { slug: "hoodies", label: "Hoodies", imageURL: "https://images.unsplash.com/photo-1526476148966-98bd039463ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvb2RpZXN8ZW58MHx8MHx8fDA%3D" },
  { slug: "shirts", label: "Shirts", imageURL: "https://plus.unsplash.com/premium_photo-1688497831503-235238709bd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHQtc2hpcnRzfGVufDB8fDB8fHww"},
  { slug: "sneakers", label: "Sneakers", imageURL: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM0fHxTbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D" },
];

export default function Shop() {
  return (
    <div className="shop shop-collections">
      <h2>Collections</h2>
      <p>Choose a collection to browse all products in that category.</p>

      <div className="collections">
        {collections.map((collection) => (
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
    </div>
  );
}
