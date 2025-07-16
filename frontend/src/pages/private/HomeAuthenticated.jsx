import "./HomeAuthenticated.css";

import Hero from "../../components/homeAuthenticated/Hero";
import FeaturedProducts from "../../components/homeAuthenticated/FeaturedProducts";
import UserStats from "../../components/homeAuthenticated/UserStats";
import PromoSection from "../../components/homeAuthenticated/PromoSection";

function HomeAuthenticated() {

  return (
    <section className="home-authenticated">
      <Hero/>
      <UserStats/>
      <PromoSection/>
      <FeaturedProducts/>
    </section>
  );
}

export default HomeAuthenticated;
