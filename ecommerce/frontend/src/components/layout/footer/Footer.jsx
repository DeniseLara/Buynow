import './Footer.css'; 
import { Link } from 'react-router-dom';
import logo from '../../../assets/compra-logo.webp';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {

  return (
    <footer className="footer section">
      <section className="footer-content container">
        <article className="footer-logo">
          <div className="logo-container">
            <Link className="logo-name" to="/" aria-label='home'> Buynow </Link>
            <img className='logo' src={logo} alt="BuyNow logo"/>
          </div>
          <p className="footer-logo-description">
            Your trusted online store for quality clothing, electronics, and jewelry.
          </p>
        </article>
        
        <article className="footer-links">
          <h4 className='footer-subtitle'>Quick links</h4>
          <ul>
            <li>
              <Link to="" aria-label="About us page">
                About Us
              </Link>
            </li>
            <li>
              <Link to="" aria-label="Terms and conditions page">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="" aria-label="Privacy policy page">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="" aria-label="Frequently asked questions page">
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </article>
        
        <article className="footer-subscribe">
          <h4 className='footer-subtitle'>Subscribe to our Newsletter</h4>
          <form>
            <input type="email" placeholder="Type your email" />
            <button type="submit" aria-label="Subscribe to newsletter">Subscribe</button>
          </form>
        </article>
        
        <article className="footer-social">
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
        </article>
        
        <article className="footer-contact">
          <h4 className="footer-subtitle">Contact Us</h4>
          <p>Address: 123 Fictitious Street, City</p>
          <p>Phone: (123) 456-7890</p>
        </article>
      </section>      
        
      <p className='footer-rights'>
        © 2025 BuyNow. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
