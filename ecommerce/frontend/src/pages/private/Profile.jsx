import "./Profile.css";
import { MdEdit } from "react-icons/md";
import { useProfile, ProfileProvider } from "../../context/ProfileContext";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ShippingAddress from "../../components/profile/ShippingAddress";
import ViewLinks from "../../components/profile/ViewLinks";

function ProfileContent() {
  const {
    editMode,
    handleLogout,
    handleEditToggle,
    handleSaveChanges,
    handleCancelEdit,
  } = useProfile();

  return (
    <section className="profile-data-container" aria-labelledby="profile-title">
      <div className="container">
        <h1 className="profile-title">Profile</h1>
        <header className="profile-principal">
          <h2 className="profile-subtitle">
            Account information
          </h2>
          <button 
            className="edit-profile-button" 
            onClick={handleEditToggle} 
            aria-label="edit profile"
            type="button"
          >
            <MdEdit />
          </button>
        </header>

        <ProfileHeader/>

        <div className="profile-details">
          <ShippingAddress/>

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