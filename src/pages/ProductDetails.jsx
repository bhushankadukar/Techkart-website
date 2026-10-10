import { Link, useParams } from "react-router-dom";
import { laptops } from "../data/laptops.js";
import { useCart } from "../context/CartContext.jsx";

const money = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function ProductDetails() {
  const { id } = useParams();
  const laptop = laptops.find((item) => item.id === id);
  const { addToCart } = useCart();

  if (!laptop) {
    return <section className="not-found"><span>404</span><h1>Laptop not found</h1><p>This product may have moved or the link is incorrect.</p><Link className="button button-primary" to="/products">Back to laptops</Link></section>;
  }

  const specs = [
    ["Brand", laptop.brand],
    ["Processor", laptop.processor],
    ["Memory", laptop.ram],
    ["Storage", laptop.storage],
    ["Display", laptop.display],
    ["Graphics", laptop.graphics]
  ];

  return (
    <section className="details-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/products">Laptops</Link><span>/</span><strong>{laptop.name}</strong></div>
      <div className="details-layout">
        <div className="details-image-wrap"><span className="details-badge">TechKart pick</span><img src={laptop.image} alt={laptop.name} /></div>
        <div className="details-copy">
          <span className="section-kicker">{laptop.brand.toUpperCase()} LAPTOP</span>
          <h1>{laptop.name}</h1>
          <div className="details-rating"><span>★</span> {laptop.rating} <span className="review-count">({laptop.reviews} sample reviews)</span></div>
          <p className="details-description">{laptop.description}</p>
          <div className="details-price">{money(laptop.price)} <del>{money(laptop.originalPrice)}</del></div>
          <p className="tax-note">Illustrative price in INR. No payment is collected by this demo.</p>
          <div className="details-stock"><span className="stock-dot" /> In stock · {laptop.stock} sample units</div>
          <button className="button button-primary details-add" disabled={laptop.stock < 1} onClick={() => addToCart(laptop)}>Add to cart <span>→</span></button>
          <div className="details-perks"><div><span>✓</span> Clear product specifications</div><div><span>✓</span> Cart saved in this browser</div><div><span>✓</span> Demo checkout, no real payment</div></div>
        </div>
      </div>
      <div className="specification-panel"><div className="section-heading"><div><span className="section-kicker">AT A GLANCE</span><h2>Specifications<span>.</span></h2></div></div><div className="spec-table">{specs.map(([label, value]) => <div className="spec-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div>
    </section>
  );
}