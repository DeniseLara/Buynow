import "./HomeAuthenticated.css";
import Hero from "../../components/homeAuthenticated/Hero/Hero";
import FeaturedProducts from "../../components/homeAuthenticated/FeaturedProducts/FeaturedProducts";
import UserStats from "../../components/homeAuthenticated/UserStats/UserStats";
import PromoSection from "../../components/homeAuthenticated/PromoSection/PromoSection";

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
