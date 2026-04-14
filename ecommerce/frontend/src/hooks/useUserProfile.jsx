import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export function useUserProfile() {
  const { logout, userData, updateProfile } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  const handleLogout = async () => {
    await logout();
  };

  const handleEditToggle = () => {
    if (!editMode) {
      setFormData({
        name: userData?.name || "",
        address: userData?.address || "",
        paymentMethods: [...(userData?.paymentMethods || [])]
      });
      setSelectedCard(null)
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancelEdit = () => {
    setFormData({
      address,
      paymentMethods,
    });

    setEditMode(false);
  };

  const handleAddPaymentMethod = () => {
    if (!selectedCard) return;
    const exists = formData.paymentMethods.some((c) => c.id === selectedCard.id);
    if (!exists) {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, selectedCard],
      }));
    }
    setSelectedCard(null);
  };

  // Remover tarjeta temporalmente
  const handleRemovePaymentMethod = (id) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(p => p.id !== id)
    }));
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
    selectedCard, 
    setSelectedCard,
    handleLogout,
    handleEditToggle,
    handleChange,
    handleAddPaymentMethod,
    handleSaveChanges,
    handleRemovePaymentMethod,
    handleCancelEdit,
  };
}
