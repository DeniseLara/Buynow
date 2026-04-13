import { Link } from 'react-router-dom';
import logo from '../../../assets/compra-logo.png';

function FooterMain() {
  return (
    <section className="footer-content-principal">
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
    </section>
  );
}
export default FooterMain;
