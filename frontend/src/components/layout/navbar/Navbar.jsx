import './Navbar.css';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

import NavbarToggleButton from './NavbarToggleButton';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';
import CartIcon from './CartIcon';
import SidebarMenu from './SidebarMenu';


function Navbar() { 
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
        
    const toggleMenu = () => setMenuOpen(!menuOpen);


return (
    <header className='header'>
        <div className={`menu-overlay ${menuOpen ? 'show' : ''}`} onClick={toggleMenu}></div>
        
        <nav className="navbar container">
            <NavbarToggleButton toggleMenu={toggleMenu}/>

            <Logo/>
                
        <div className="navbar-icons">
            <SearchBar/>

            <ProfileMenu user={user}/>

            <CartIcon user={user}/>
        </div>
        </nav>

        <SidebarMenu toggleMenu={toggleMenu} menuOpen={menuOpen} user={user}/>
        </header>
    );
}

export default Navbar;
