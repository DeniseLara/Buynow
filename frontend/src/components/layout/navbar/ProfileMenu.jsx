import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Perfil from '../../../assets/profile.png';
import { useProfile } from '../../../context/ProfileContext';

export function ProfileMenu({ user }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { profileImage } = useProfile();


  if (!user) {
    return (
      <div
        className="icon-wrapper profile-container"
        onMouseEnter={() => setProfileMenuOpen(true)}
        onMouseLeave={() => setProfileMenuOpen(false)}
      >
        <FaUserCircle className="icon-link" />
        {profileMenuOpen && (
          <div className="profile-menu">
            <Link className="link" to="/login" aria-label="go to login page">Iniciar sesión</Link>
            <Link className="link" to="/signup" aria-label="go to sign up page">Registrarse</Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="icon-wrapper profile-avatar">
        <Link to="/profile" className="icon-link" aria-label='go to profile page'>
            <img 
                src={profileImage || Perfil} 
                alt="Profile Avatar" 
                className="avatar-image"
                loading='lazy' 
            />
        </Link>
    </div>
  );
}

export default ProfileMenu;