import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const money = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function Cart() {
  const { cart, subtotal, increase, decrease, remove } = useCart();

  if (!cart.length) {
    return <section className="empty-cart"><div className="empty-cart-icon">🛒</div><span className="section-kicker">YOUR TECHKART BAG</span><h1>Your cart is waiting.</h1><p>Looks like you haven't added a laptop yet. Explore the collection to find one.</p><Link to="/products" className="button button-primary">Explore laptops →</Link></section>;
  }

  return (
    <section className="cart-page">
      <div className="page-title"><span className="section-kicker">ALMOST YOURS</span><h1>Your shopping cart<span>.</span></h1><p>{cart.reduce((sum, item) => sum + item.quantity, 0)} item(s) in your cart</p></div>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link to={`/products/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.name} /></Link>
              <div className="cart-item-info"><span className="product-brand">{item.brand}</span><Link to={`/products/${item.id}`} className="product-name">{item.name}</Link><p>{item.ram} RAM · {item.storage}</p><button className="remove-button" onClick={() => remove(item.id)}>Remove</button></div>
              <div className="cart-item-right"><strong>{money(item.price * item.quantity)}</strong><div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => decrease(item.id)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= item.stock} onClick={() => increase(item.id)}>+</button></div><small>{money(item.price)} each</small></div>
            </article>
          ))}
          <Link to="/products" className="continue-link">← Continue shopping</Link>
        </div>
        <aside className="order-summary">
          <span className="section-kicker">SUMMARY</span><h2>Order summary</h2>
          <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className="summary-line"><span>Delivery</span><strong className="free-label">FREE</strong></div>
          <div className="summary-line"><span>Taxes</span><span>Included in demo price</span></div>
          <div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div>
          <p className="checkout-note">This is a demo checkout. No real payment will be taken.</p>
          <Link to="/checkout" className="button button-primary checkout-button">Continue to checkout →</Link>
          <div className="secure-note">◇ Demo order · No payment gateway</div>
        </aside>
      </div>
    </section>
  );
}