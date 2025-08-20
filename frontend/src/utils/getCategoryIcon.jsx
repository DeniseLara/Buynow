import {
  GiShoppingCart,
  GiSunglasses,
  GiLaptop,
  GiPerfumeBottle
} from "react-icons/gi";

import {
  FaAppleAlt,
  FaHome,
  FaUserAlt,
  FaFemale,
  FaMale,
} from "react-icons/fa";

const getCategoryIcon = (group) => {
  switch (group) {
    case "Women":
      return <span className="category-icon"><FaFemale /></span>;
    case "Men":
      return <span className="category-icon"><FaMale /></span>; 
    case "Fragrances":
      return <span className="category-icon"><GiPerfumeBottle /></span>; 
    case "Skincare":
      return <span className="category-icon"><FaAppleAlt /></span>; 
    case "Electronics":
      return <span className="category-icon"><GiLaptop /></span>;
    case "Home":
      return <span className="category-icon"><FaHome /></span>;
    case "Groceries":
      return <span className="category-icon"><GiShoppingCart /></span>; 
    case "Accessories":
      return <span className="category-icon"><GiSunglasses /></span>; 
    default:
      return <span className="category-icon"><FaUserAlt /></span>;
  }
};

export default getCategoryIcon;
