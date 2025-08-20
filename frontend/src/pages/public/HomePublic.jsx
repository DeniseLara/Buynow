import './HomePublic.css'

import Hero from '../../components/homePublic/Hero/Hero';
import Benefits from '../../components/homePublic/Benefits/Benefits';
import AuthSection from '../../components/homePublic/AuthSection/AuthSection';
import FeaturedProducts from '../../components/homePublic/FeaturedProducts/FeaturedProducts'

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
