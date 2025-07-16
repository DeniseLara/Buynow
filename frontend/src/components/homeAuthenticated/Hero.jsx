import { Link } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";

function Hero() {
    const { userName } = useProfile(); 
    
    return(
        <header className="hero-authenticated">
            <div className="hero-authenticated-content">
                <h1 className="home-authenticated-title">
                    Welcome back, {userName || 'Guest'}!
                </h1>
                <p className="home-authenticated-description">Find the best of our products.</p>
                <Link 
                to="/products" 
                className="explore-btn"
                aria-label="explore our products collection">
                  Explore products
                </Link>
            </div>
        </header>
    );
}

export default Hero;