import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export function useUserProfile() {
  const { logout, userData, updateProfile } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const handleLogout = async () => {
    await logout();
  };

  const handleEditToggle = () => {
    if (!editMode) {
      setFormData({
        name: userData?.name || "",
        address: userData?.address || "",
      });
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancelEdit = () => {
    setFormData({
      address,
    });

    setEditMode(false);
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile({
        ...formData 
      });
      setEditMode(false);
      alert("Perfil actualizado!");
    } catch (e) {
      alert("Error al guardar");
    }
  };


  return {
    editMode,
    formData,
    handleLogout,
    handleEditToggle,
    handleChange,
    handleSaveChanges,
    handleCancelEdit,
  };
}
