import styles from './ProfileHeader.module.css'
import { useAuthContext } from '../../../context/AuthContext';
import Perfil from '../../../assets/profile.png';

function ProfileHeader() {
  const { user, userName } = useAuthContext()
  
  return (
    <div className={styles.container}>
      <figure className={styles.avatarWrapper}>
        <img
          src={Perfil}
          alt="user's profile picture"
          className={styles.avatar}
          loading="lazy"
        />
      </figure>
          
      <div className={styles.info}>
        <h2 className={styles.username}>{userName || "User"}</h2>
        <p className={styles.email}>{user?.email}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
