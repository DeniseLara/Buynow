import './HomePublic.css'

import Hero from '../../components/home/Hero';
import Benefits from '../../components/home/Benefits';
import AuthSection from '../../components/home/AuthSection';
import FeaturedProducts from '../../components/home/FeaturedProducts'

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
