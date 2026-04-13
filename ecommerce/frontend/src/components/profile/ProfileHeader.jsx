import styles from './ProfileHeader.module.css'
import { useAuthContext } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';

function ProfileHeader() {
  const { userData } = useAuthContext();
  const { editMode, formData, handleChange } = useProfile();
  
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {editMode ? (
          <>
            <input
              type="text"
              name="name" // Debe coincidir con la llave en formData
              value={formData.name || ""}
              onChange={handleChange}
              className={styles.editInput}
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.editInput}
              placeholder="Email"
              // Nota: Cambiar el email en Firebase Auth requiere re-autenticación. 
              // Por ahora lo editaremos solo en la base de datos de perfil.
            />
          </>
        ) : (
          <>
            <div className={styles.infoContainer}>
            <strong>Name</strong>
            <p className={styles.username}>{userData?.name || "Guest"}</p>
            </div>

            <div className={styles.infoContainer}>
            <strong>Email</strong>
            <p className={styles.email}>{userData?.email}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
