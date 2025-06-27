import { Link } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";

function Hero() {
  return (
    <div  className="hero-public">
      <div className="hero-content">
      <div className="hero-public-content">
        <h1 className='hero-public-title'>Find the best products for you</h1>
        <p className='hero-public-description'>
          Explore our wide range of products at unbeatable prices.
        </p>
        <Link 
        to="/products" 
        className="cta-btn-hero"
        aria-label='explore products'>
        Explore products <span className='arrow-icon'><MdArrowOutward/></span>
        </Link> 
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <h3>10K+</h3>
          <p>Satisfied Customers</p>
        </div>
  
        <div className="stat-item">
          <h3>5K+</h3>
          <p>Positive Reviews</p>
        </div>

        <div className="stat-item">
          <h3>100%</h3>
          <p>Always Available</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Hero;