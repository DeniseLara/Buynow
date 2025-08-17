import { Link } from 'react-router-dom';
import Personas from '../../assets/shop.png'

function AuthSection() {
  return (
    <section className="auth-section" aria-labelledby="auth-section-title">
      <header className="auth-content">
        <h2 id="auth-section-title" className='auth-section-title'>Join us and enjoy more benefits!</h2>
        <p className='auth-section-description'>
          Sign up to access your profile, view your purchase history, and much more.
        </p>
      
      <div className="auth-buttons">
        <Link 
        to="/signup" 
        className="cta-btn-auth"
        aria-label="sign up for an account"
        >    
          Get started   
        </Link>
      </div>
      </header>

      <div className="auth-image-container">
        <img 
        src={Personas} 
        alt="People enjoying shopping together" 
        loading="lazy" 
        className='auth-image'
        />
      </div>
    </section>
  );
}

export default AuthSection;
