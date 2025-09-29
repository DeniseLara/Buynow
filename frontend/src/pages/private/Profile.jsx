import "./Profile.css";
import { MdEdit } from "react-icons/md";
import { useProfile, ProfileProvider } from "../../context/ProfileContext";

import ProfileHeader from "../../components/profile/ProfileHeader/ProfileHeader";
import ShippingAddress from "../../components/profile/ShippingAddress/ShippingAddress";
import PaymentMethods from "../../components/profile/PaymentMethods/PaymentMethods";
import ViewLinks from "../../components/profile/ViewLinks/ViewLinks";
import { useAuth } from "../../context/AuthContext";

function ProfileContent() {
  const { user, userName } = useAuth()
  const {
    editMode,
    handleLogout,
    handleEditToggle,
    handleSaveChanges,
    handleCancelEdit,
  } = useProfile();

  return (
    <section className="profile-data-container" aria-labelledby="profile-title">
      <header className="profile-principal">
        <h1 id="profile-title" className="profile-title">
          My profile
        </h1>
        <button 
          className="edit-profile-button" 
          onClick={handleEditToggle} 
          aria-label="edit profile"
          type="button"
        >
          <MdEdit />
        </button>
      </header>

      <ProfileHeader
        user={user} 
        userName={userName} 
      />

      <div className="profile-details">
        <ShippingAddress/>

        <PaymentMethods/>

        {editMode && (
          <div className="profile-action-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelEdit} 
              aria-label="cancel editing profile"
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-button"
              onClick={handleSaveChanges}
              aria-label="save profile changes"
            >
              Save Changes
            </button>
          </div>
        )}
          
        <ViewLinks/>

        <button 
          className="logout-button" 
          onClick={handleLogout}
          aria-label="log out"
          type="button"
        >
          Log Out
        </button>
      </div>
    </section>
  );
}

export default function Profile() {
  return (
    <ProfileProvider>
      <ProfileContent/>
    </ProfileProvider>
  );
}