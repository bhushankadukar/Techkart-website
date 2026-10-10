import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

export default function LaptopCard({ laptop }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${laptop.id}`} className="product-image-link">
        <div className="product-image-wrap">
          {laptop.badge && <span className="product-badge">{laptop.badge}</span>}
          <img className="product-image" src={laptop.image} alt={laptop.name} loading="lazy" />
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-brand">{laptop.brand}</div>
        <Link to={`/products/${laptop.id}`} className="product-name">{laptop.name}</Link>
        <div className="product-rating"><span>★</span> {laptop.rating} <span className="review-count">({laptop.reviews} reviews)</span></div>
        <div className="spec-chips">
          <span>{laptop.ram} RAM</span>
          <span>{laptop.storage}</span>
        </div>
        <div className="product-price-row">
          <div>
            <strong className="product-price">{money(laptop.price)}</strong>
            <del className="old-price">{money(laptop.originalPrice)}</del>
          </div>
          <span className="stock-dot" title="In stock">In stock</span>
        </div>
        <div className="product-card-actions">
          <Link to={`/products/${laptop.id}`} className="button button-outline">Details</Link>
          <button className="button button-primary" onClick={() => addToCart(laptop)} disabled={laptop.stock < 1}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}