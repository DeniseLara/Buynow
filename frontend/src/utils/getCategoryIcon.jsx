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
      return <span className="category-icon"><FaFemale /></span>; // mujer
    case "Men":
      return <span className="category-icon"><FaMale /></span>; // hombre
    case "Fragrances":
      return <span className="category-icon"><GiPerfumeBottle /></span>; // perfume
    case "Skincare":
      return <span className="category-icon"><FaAppleAlt /></span>; // salud/belleza
    case "Electronics":
      return <span className="category-icon"><GiLaptop /></span>; // laptop = tecnología
    case "Home":
      return <span className="category-icon"><FaHome /></span>; // casa
    case "Groceries":
      return <span className="category-icon"><GiShoppingCart /></span>; // carrito
    case "Accessories":
      return <span className="category-icon"><GiSunglasses /></span>; // lentes
    default:
      return <span className="category-icon"><FaUserAlt /></span>; // ícono genérico
  }
};

export default getCategoryIcon;
