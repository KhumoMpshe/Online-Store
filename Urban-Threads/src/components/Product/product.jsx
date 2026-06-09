import "../Product/product.css";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={product.imageURL} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}