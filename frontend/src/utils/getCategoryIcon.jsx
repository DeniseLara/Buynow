import { GiArmoredPants, GiClothes, GiDiamondRing } from "react-icons/gi";
import { MdDevices } from "react-icons/md";
import { FaThLarge } from "react-icons/fa";

const getCategoryIcon = (category) => {
  switch (category) {
    case "men's clothing":
      return <span className="category-icon"><GiArmoredPants /></span>;
    case "women's clothing":
      return <span className="category-icon"><GiClothes /></span>;
    case "jewelery":
      return <span className="category-icon"><GiDiamondRing /></span>;
    case "electronics":
      return <span className="category-icon"><MdDevices /></span>;
    default:
      return <span className="category-icon"><FaThLarge /></span>;
  }
};

export default getCategoryIcon;
