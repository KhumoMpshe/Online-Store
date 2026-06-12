import "../Product/product.css";

export default function ProductCard({ product, addToCart }) {
  const name =
    product.Name ||
    product.name ||
    product.title ||
    product.productName ||
    product.product_name ||
    product.label ||
    product.product ||
    "Untitled product";
  const description =
    product.Description ||
    product.description ||
    product.desc ||
    product.details ||
    product.info ||
    product.productDescription ||
    "";
  const size =
    product.Size ||
    product.size ||
    product.sizes ||
    product.variant ||
    product.options ||
    "";
  const category =
    product.Category ||
    product.category ||
    product.cat ||
    product.collection ||
    product.type ||
    "";
  const price =
    product.Price ??
    product.price ??
    product.cost ??
    product.amount ??
    product.salePrice ??
    product.priceValue;
  const image =
    product.imageURL ||
    product.image ||
    product.img ||
    product.image_url ||
    "";

  return (
    <div className="card">
      {image ? (
        <img src={image} alt={name || "product"} />
      ) : (
        <div className="card-image-fallback">No image</div>
      )}

      <h3>{name}</h3>

      {description && <p>{description}</p>}

      {size && <p>{size}</p>}

      {category && <p>{category}</p>}

      {typeof price !== "undefined" && <p>R{price}</p>}

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}