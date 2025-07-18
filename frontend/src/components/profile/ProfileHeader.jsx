import Perfil from '../../assets/profile.png';

function ProfileHeader({ 
  user, 
  userName, 
}) {
  
  return (
    <div className="profile-header">
      <figure className="profile-avatar-wrapper">
        <img
          src={Perfil}
          alt="user's profile picture"
          className="profile-avatar"
          loading="lazy"
        />
      </figure>
          
      <div className="profile-principal-text">
        <h2 className="username">{userName || "User"}</h2>
        <p className="email">{user?.email}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
