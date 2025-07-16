import { Link } from "react-router-dom";
import './PromoSection.css'; 

function PromoSection() {
  return (
    <section className="promo-section" aria-label="Personalized offers">
      <h2 className="promo-title">Just for You</h2>
      <div className="promo-banner">
        <p>🔥 20% off on your next order!</p>
        <Link to="/products" className="explore-btn">Shop Now</Link>
      </div>
    </section>
  );
}

export default PromoSection;
