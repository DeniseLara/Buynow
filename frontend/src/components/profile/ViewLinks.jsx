import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

function ViewLinks() {
  return (
    <div className="profile-view-details">
      <ul className="profile-view-list">
        <li className="profile-view">
          <span className="btn-text">View order history</span> 
          <Link className="btn-view" to="/orders"> 
            <GoChevronRight/>
          </Link>
        </li>

        <li className="profile-view">
          <span className="btn-text">View wishlist</span> 
          <Link className="btn-view" to="/favorites">
            <GoChevronRight/>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ViewLinks;
