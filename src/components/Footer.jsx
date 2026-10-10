import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">T</span>
            <span>tech<span className="brand-accent">kart</span></span>
          </Link>
          <p>Your next laptop starts here.</p>
        </div>
        <p>Demo storefront · Prices are illustrative · No real payments</p>
        <p>© {new Date().getFullYear()} TechKart</p>
      </div>
    </footer>
  );
}