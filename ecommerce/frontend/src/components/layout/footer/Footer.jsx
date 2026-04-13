import './Footer.css'; 
import FooterMain from './FooterMain';
import FooterSide from './FooterSide';

function Footer() {

  return (
    <footer className="footer section">
      <div className="footer-content container">
        <FooterMain/>
        <FooterSide/>       
        <p className='footer-rights'>
          © 2025 BuyNow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
