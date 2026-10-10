import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const money = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const [order, setOrder] = useState(null);

  function handleChange(event) {
    setCustomer((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!cart.length) return;
    const orderNumber = `TK${Date.now().toString().slice(-8)}`;
    setOrder({ orderNumber, customer, items: cart, total: subtotal });
    clearCart();
  }

  if (order) {
    return <section className="order-success"><div className="success-icon">✓</div><span className="section-kicker">ORDER CONFIRMED</span><h1>Thanks, {order.customer.name.split(" ")[0]}!</h1><p>Your demo order has been created successfully.</p><div className="order-number">Demo order number <strong>{order.orderNumber}</strong></div><div className="success-summary"><span>Order total</span><strong>{money(order.total)}</strong><span>Items</span><strong>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div><p className="checkout-note">This is a demonstration only. No payment was processed and no products will be shipped.</p><Link to="/products" className="button button-primary">Back to shopping</Link></section>;
  }

  if (!cart.length) {
    return <section className="empty-cart"><div className="empty-cart-icon">🛍️</div><h1>Your cart is empty</h1><p>Add a laptop before proceeding to checkout.</p><Link to="/products" className="button button-primary">Browse laptops</Link></section>;
  }

  return (
    <section className="checkout-page">
      <div className="page-title"><span className="section-kicker">DEMO CHECKOUT</span><h1>Almost there<span>.</span></h1><p>Enter sample details to preview an order confirmation.</p></div>
      <div className="checkout-layout">
        <form className="panel checkout-form" onSubmit={handleSubmit}>
          <h2>Contact and delivery details</h2>
          <p className="form-intro">Use test details only. This project does not send or store orders on a server.</p>
          <label htmlFor="name">Full name</label><input id="name" name="name" value={customer.name} onChange={handleChange} autoComplete="name" required />
          <div className="form-row"><div><label htmlFor="email">Email</label><input id="email" name="email" type="email" value={customer.email} onChange={handleChange} autoComplete="email" required /></div><div><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" pattern="[0-9]{10}" title="Enter a 10-digit phone number" value={customer.phone} onChange={handleChange} autoComplete="tel" placeholder="10 digits" required /></div></div>
          <label htmlFor="address">Address</label><textarea id="address" name="address" rows="3" value={customer.address} onChange={handleChange} autoComplete="street-address" required />
          <div className="form-row"><div><label htmlFor="city">City</label><input id="city" name="city" value={customer.city} onChange={handleChange} autoComplete="address-level2" required /></div><div><label htmlFor="pincode">PIN code</label><input id="pincode" name="pincode" inputMode="numeric" pattern="[0-9]{6}" title="Enter a 6-digit PIN code" value={customer.pincode} onChange={handleChange} autoComplete="postal-code" required /></div></div>
          <div className="demo-payment-notice"><span>ⓘ</span><div><strong>No real payment</strong><p>This button only creates a local demo confirmation. It does not charge you.</p></div></div>
          <button type="submit" className="button button-primary checkout-button">Place demo order · {money(subtotal)}</button>
        </form>
        <aside className="order-summary checkout-summary"><span className="section-kicker">YOUR ORDER</span><h2>Order summary</h2>{cart.map((item) => <div className="mini-order-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>Qty: {item.quantity}</small></div><b>{money(item.price * item.quantity)}</b></div>)}<div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div><Link to="/cart" className="continue-link">Edit cart</Link></aside>
      </div>
    </section>
  );
}