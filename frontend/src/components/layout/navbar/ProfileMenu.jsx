import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Perfil from '../../../assets/profile.png';

export function ProfileMenu({ user }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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
            <Link className="link" to="/login" aria-label="go to login page">
              Log in
            </Link>
            <Link className="link" to="/signup" aria-label="go to sign up page">
              Sign up
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="icon-wrapper profile-avatar">
      <Link to="/profile" className="icon-link" aria-label='go to profile page'>
        <img 
          src={Perfil} 
          alt="Profile Avatar" 
          className="avatar-image"
          loading='lazy' 
        />
      </Link>
    </div>
  );
}

export default ProfileMenu;