import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import fakeTestCards from '../../../data/fakeTestCards';

function FooterSide() {
  return (
    <section className="footer-side-content">
      <article className="footer-payment">
        <h4 className="footer-subtitle">Secure Payments</h4>
        <div className="payment-logos">
          {fakeTestCards.map(card => (
            <img 
              key={card.brand} 
              src={card.logo} 
              alt={card.brand} 
              className="payment-logo" 
            />
          ))}
        </div>
      </article>

      <div className="footer-social">
        <h4 className="footer-subtitle">Follow Us</h4>
        <ul className="footer-social-list">
          <Link 
            to="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
          >
              <FaFacebook />
          </Link>
          <Link 
            to="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
          >
            <FaTwitter />
          </Link>
          <Link 
            to="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
          >
            <FaInstagram />
          </Link>
        </ul>
      </div>

      <article className="footer-contact">
        <h4 className="footer-subtitle">Contact Us</h4>
        <p>Address: 123 Fictitious Street, City</p>
        <p>Phone: (123) 456-7890</p>
      </article>
    </section>
  );
}
export default FooterSide;
