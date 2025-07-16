import { Link } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";

function Hero() {
  return (
    <section className="hero-public">
      <div className="hero-content">

        <div className="hero-public-content">
          <h1 id="hero-title" className='hero-public-title'>Find the best products for you</h1>
          <p className='hero-public-description'>
            Explore our wide range of products at unbeatable prices.
          </p>
          <Link 
          to="/products" 
          className="cta-btn-hero"
          aria-label='explore products'
          >
            Explore products <span className='arrow-icon'><MdArrowOutward/></span>
          </Link> 
        </div>

        <ul className="hero-stats" aria-label="Site statistics">
          <li className="stat-item">
            <h3>10K+</h3>
            <p>Satisfied Customers</p>
          </li>
  
          <li className="stat-item">
            <h3>5K+</h3>
            <p>Positive Reviews</p>
          </li>

          <li className="stat-item">
            <h3>100%</h3>
            <p>Always Available</p>
          </li>
        </ul>
      </div>
  </section>
  );
};

export default Hero;