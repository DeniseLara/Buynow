import './Footer.css'; 

import FooterMain from './FooterMain';
import FooterSide from './FooterSide';

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-content">
        <FooterMain/>

        <FooterSide/>       
        <p className='footer-rights'>© 2025 BuyNow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
