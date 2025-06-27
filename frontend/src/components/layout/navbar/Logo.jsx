import { Link } from 'react-router-dom';
import logo from '../../../assets/compra-logo.png';

function Logo() {
  return (
    <div className="logo-container">
        <Link className="logo-name" to="/" aria-label='home'> Buynow </Link>
        <img className='logo' src={logo} alt="BuyNow logo"/>
    </div>
  );
}

export default Logo;