import styles from './ProfileHeader.module.css'
import { useAuthContext } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';

function ProfileHeader() {
  const { userData } = useAuthContext();
  const { editMode, formData, handleChange } = useProfile();
  
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h3>Name</h3>
        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className={styles.input}
              placeholder="Full Name"
            />
          </>
        ) : (
          <div className={styles.infoContainer}>
            <div className={styles.infoContent}>
            <p className={styles.username}>{userData?.name || "Guest"}</p>
            </div>

            <div className={styles.infoContent}>
            <h3>Email</h3>
            <p className={styles.email}>{userData?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
