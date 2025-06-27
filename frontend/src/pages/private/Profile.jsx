import "./Profile.css";
import { MdEdit } from "react-icons/md";
import { useUserProfile } from "../../hooks/useUserProfile";

import ProfileHeader from "../../components/profile/ProfileHeader";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import ShippingAddress from "../../components/profile/ShippingAddress";
import PaymentMethods from "../../components/profile/PaymentMethods";
import ViewLinks from "../../components/profile/ViewLinks";
import fakeTestCards from "../../data/fakeTestCards";

function Profile() {
   const {
    user,
    loading,
    profileImage,
    userName,
    editMode,
    selectedCard,
    paymentMethods,
    address,
    handleLogout,
    handleEditToggle,
    handleChange,
    handleAddPaymentMethod,
    handleSaveChanges,
    setSelectedCard,
    removePaymentMethod,
    formData
  } = useUserProfile();
 
  if (loading) {
    return (
      <SkeletonLoader/>
    );
  }

  return (
    <div className="profile-data-container">
      
      <div className="profile-principal">
      <h1 className="profile-title">My profile</h1>

      <button 
      className="edit-profile-button" 
      onClick={handleEditToggle} 
      aria-label="edit profile"
      type="button"
      >
        <MdEdit />
      </button>
      </div>

      <ProfileHeader
      user={user} 
      userName={userName} 
      profileImage={profileImage} 
      />

      <div className="profile-details">
        <ShippingAddress
        editMode={editMode}
        address={address}
        formData={formData}
        handleChange={handleChange}
        />

        <PaymentMethods
        editMode={editMode}
        selectedCard={selectedCard}
        fakeTestCards={fakeTestCards}
        setSelectedCard={setSelectedCard}
        handleAddPaymentMethod={handleAddPaymentMethod}
        paymentMethods={paymentMethods}
        removePaymentMethod={removePaymentMethod}
        />

        {editMode && (
          <button
          type="button" 
          className="save-button" 
          onClick={handleSaveChanges}
          aria-label="save profile changes"
          >
          Save Changes
          </button>
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
  );
}

export default Profile;