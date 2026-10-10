import { Link } from "react-router-dom";
import { laptops } from "../data/laptops.js";
import LaptopCard from "../components/LaptopCard.jsx";

export default function Home() {
  const featured = laptops.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker"><span className="pulse-dot" /> THE LAPTOP EDIT</span>
          <h1>Power your next <span>big idea.</span></h1>
          <p>Find a laptop that fits your work, your study, your creativity, and everything in between.</p>
          <div className="hero-actions">
            <Link to="/products" className="button button-light">Explore laptops <span>→</span></Link>
            <a href="#why-techkart" className="hero-text-link">Why TechKart?</a>
          </div>
          <div className="hero-trust">
            <span>✓ Curated picks</span>
            <span>✓ Clear pricing</span>
            <span>✓ Easy cart</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <img src={laptops[1].image} alt="Laptop featured in the TechKart store" />
          <div className="floating-tag"><span>✦</span><div><strong>Find your fit</strong><small>Work · Study · Create</small></div></div>
          <div className="hero-price"><small>Starting from</small><strong>₹42,990</strong></div>
        </div>
      </section>

      <section className="trust-strip" id="why-techkart">
        <div><span className="trust-icon">⌕</span><div><strong>Easy discovery</strong><small>Search and filter laptops</small></div></div>
        <div><span className="trust-icon">◇</span><div><strong>Specs at a glance</strong><small>Compare key features</small></div></div>
        <div><span className="trust-icon">♡</span><div><strong>Cart that remembers</strong><small>Your cart stays after refresh</small></div></div>
      </section>

      <section className="section featured-section">
        <div className="section-heading">
          <div><span className="section-kicker">HANDPICKED FOR YOU</span><h2>Featured laptops<span>.</span></h2><p>Explore a few of our sample store favourites.</p></div>
          <Link to="/products" className="view-all-link">View all laptops <span>→</span></Link>
        </div>
        <div className="product-grid">
          {featured.map((laptop) => <LaptopCard key={laptop.id} laptop={laptop} />)}
        </div>
      </section>

      <section className="bottom-cta">
        <div><span className="section-kicker">YOUR NEXT UPGRADE</span><h2>A better setup starts with the right laptop.</h2><p>Browse the full sample collection and find your next favourite.</p></div>
        <Link to="/products" className="button button-primary">Shop all laptops →</Link>
      </section>
    </>
  );
}