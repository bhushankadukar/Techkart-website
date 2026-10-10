import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand" aria-label="TechKart home">
          <span className="brand-mark">T</span>
          <span>tech<span className="brand-accent">kart</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Laptops</NavLink>
        </nav>
        <Link to="/cart" className="cart-link">
          <span aria-hidden="true">🛒</span>
          <span>Cart</span>
          <span className="cart-count">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
}