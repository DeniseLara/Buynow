import './HomePublic.css'

import Hero from '../../components/homePublic/Hero';
import Benefits from '../../components/homePublic/Benefits';
import AuthSection from '../../components/homePublic/AuthSection';
import FeaturedProducts from '../../components/homePublic/FeaturedProducts'

function HomePublic() {
  return (
    <div className="home-public">
      <Hero/>
      <FeaturedProducts/>
      <Benefits/>
      <AuthSection/>
    </div>
  );
}

export default HomePublic;
