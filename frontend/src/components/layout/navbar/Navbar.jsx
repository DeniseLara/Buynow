import './Navbar.css';
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';

import NavbarToggleButton from './NavbarToggleButton';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';
import CartIcon from './CartIcon';
import SidebarMenu from './SidebarMenu';


function Navbar() { 
    const { user } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);
        
    const toggleMenu = () => setMenuOpen(!menuOpen);


    return (
        <header className='header' role="banner">
            {menuOpen && (
                <button 
                    className={`menu-overlay ${menuOpen ? 'show' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Close menu"
                    type="button"
                >
                </button>
            )}
        
            <nav className='navbar container'>
                <NavbarToggleButton 
                    toggleMenu={toggleMenu}
                    aria-expanded={menuOpen} 
                    aria-controls="sidebar-menu"
                />
                <Logo/>
                
            <div className="navbar-icons">
                <SearchBar/>
                <ProfileMenu user={user}/>
                <CartIcon user={user}/>
            </div>
            </nav>

            <SidebarMenu 
                toggleMenu={toggleMenu} 
                menuOpen={menuOpen} 
                user={user}
                id="sidebar-menu"
            />
        </header>
    );
}

export default Navbar;
