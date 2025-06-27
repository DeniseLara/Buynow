import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

function ViewLinks() {
  return (
    <div className="profile-view-details">
          <section className="profile-view">
          <p>View order history</p> 
            <Link className="btn-view" to="/orders"> 
            <GoChevronRight/>
            </Link>
          </section>

          <section className="profile-view">
          <p>View wishlist</p> 
            <Link className="btn-view" to="/favorites"> 
            <GoChevronRight/>
            </Link>
        </section>
    </div>
  );
}

export default ViewLinks;
