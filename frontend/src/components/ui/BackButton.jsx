import '../../pages/shared/ProductDetails.css'
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const handleClick = () => {
    const isInProductDetails = location.pathname.startsWith("/products/");
    const isInCart = location.pathname === "/cart";

    if (isInProductDetails || (isInCart && user)) {
      navigate("/products");
    } else {
      navigate(-1);
    }
  };


return (
    <button 
        className="product-continue-shopping" 
        onClick={handleClick}
        aria-label='Back to the products page'
        type='button'
    >
        <AiOutlineArrowLeft /> 
    </button>
  );
}

export default BackButton;