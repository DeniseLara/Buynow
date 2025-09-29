import { useState } from "react";
import { usePayment } from "../context/PaymentContext";
import { useAuth } from "../context/AuthContext";

export function useUserProfile() {
  const { logout } = useAuth();
  const {
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    updateAddress,
    address
  } = usePayment();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ address: "", paymentMethods: [] });
  const [selectedCard, setSelectedCard] = useState(null);

  const handleLogout = async () => {
    await logout();
  };

  const handleEditToggle = () => {
    if (!editMode) {
      setFormData({
        address,
        paymentMethods: [...paymentMethods]
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
    if (!formData.address.trim()) {
      alert("La dirección no puede estar vacía.");
      return;
    }
    
    // guardar cambios
    updateAddress(formData.address);
    
    // agregar nuevas tarjetas
    const existingIds = paymentMethods.map(p => p.id);
    const toAdd = formData.paymentMethods.filter(p => !existingIds.includes(p.id));
    for (const card of toAdd) await addPaymentMethod(card);

     // Eliminar tarjetas removidas
    const toRemove = paymentMethods.filter(p => !formData.paymentMethods.some(f => f.id === p.id));
    for (const card of toRemove) {
      const index = paymentMethods.findIndex(p => p.id === card.id);
      if (index !== -1) await removePaymentMethod(index);
    }

    setEditMode(false);
  };


  return {
    editMode,
    formData,
    selectedCard,
    setSelectedCard,
    handleLogout,
    handleEditToggle,
    paymentMethods,
    address,
    handleChange,
    handleAddPaymentMethod,
    handleSaveChanges,
    handleRemovePaymentMethod,
    handleCancelEdit,
  };
}
