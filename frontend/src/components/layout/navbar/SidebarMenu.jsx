import { Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineFavorite } from "react-icons/md";
import { IoCloseOutline } from 'react-icons/io5';
import { BiReceipt } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { useAuth } from '../../../context/AuthContext';

function SidebarMenu({ toggleMenu, menuOpen, user }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toggleMenu();
  };

return (
    <div className={`navbar-menu ${menuOpen ? 'show' : ''}`}>
        <ul className="navbar-list">
            <li className='navbar-item'>
                <Link className='navbar-link' to="/" aria-label='go to home page'>
                    <AiFillHome /> Home
                </Link>
            </li>

            <li className='navbar-item'>
                <Link className='navbar-link' to="/products" aria-label='go to product page'>
                    <FiShoppingBag /> Products
                </Link>
            </li>

            <li className='navbar-item'>
                <Link className='navbar-link' to="/favorites" aria-label='go to favorites page'>
                    <MdOutlineFavorite/>  Wishlist
                </Link>
            </li>

        {user ? (
            <>
                <li className='navbar-item'>
                    <Link className='navbar-link' to="/orders" aria-label='go to my orders page'>
                        <BiReceipt /> My Orders
                    </Link>
                </li>

                <li className='navbar-item'>
                    <button 
                        className="logout-btn" 
                        onClick={handleLogout}
                        aria-label='log out'
                        type='button'
                    >
                        <MdLogout /> 
                        Log Out
                    </button>
                </li>
            </>
                ) : (
                
                <li className='navbar-item'>
                    <Link className='navbar-link sign' to="/signup" aria-label='sign up'>
                        <RiLoginBoxFill /> Sign Up
                    </Link>
                </li>
                )}
            </ul>

            <button 
            className="nav-close" 
            aria-label="close menu" 
            onClick={toggleMenu}
            type='button'
            >
                <IoCloseOutline />
            </button>
    </div>
  );
}

export default SidebarMenu;