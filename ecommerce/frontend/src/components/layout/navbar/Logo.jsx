import { Link } from 'react-router-dom';
import logo from '../../../assets/compra-logo.png';

function Logo() {
  return (
    <Link className="logo-container" to="/" aria-label="BuyNow home">
      <span className="logo-name">Buynow</span> 
      <img className='logo' src={logo} alt="BuyNow logo" aria-hidden="true"/>
    </Link>
  );
}

export default Logo;