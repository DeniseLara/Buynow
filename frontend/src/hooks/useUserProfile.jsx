import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserProfile } from "../firebase/firebase";
import { useProfile } from "../context/ProfileContext";
import { usePayment } from "../context/PaymentContext";
import { useAuth } from "../context/AuthContext";

import fakeTestCards from "../data/fakeTestCards";

export function useUserProfile() {
  const auth = getAuth();

  const { user, userData, loading, setUserData } = useAuth();
  const { userName } = useProfile();
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

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const profile = await getUserProfile(user.uid);
          setUserData(profile);
        } catch (error) {
          console.error("Error al cargar los datos del usuario", error);
        }
      };
      fetchUserData();
    } else {
      setUserData(null);
    }
  }, [user]);


  const handleLogout = async () => {
    await signOut(auth);
  };


  const handleEditToggle = () => {
    if (!editMode) {
      setFormData({
        address: userData?.address || "",
        paymentMethods: paymentMethods || []
      });
    }
    setEditMode(!editMode);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleAddPaymentMethod = () => {
    if (selectedCard === null) return;
    const selected = fakeTestCards.find(card => card.id === selectedCard);
    addPaymentMethod(selected);
    setSelectedCard(null);
  };


  const handleSaveChanges = async () => {
    if (!formData.address.trim()) {
      alert("La dirección no puede estar vacía.");
      return;
    }

    try {
      updateAddress(formData.address);
      setEditMode(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };


  return {
    user,
    userData,
    loading,
    userName,
    editMode,
    setEditMode,
    formData,
    setFormData,
    selectedCard,
    setSelectedCard,
    handleLogout,
    handleEditToggle,
    handleChange,
    handleAddPaymentMethod,
    handleSaveChanges,
    paymentMethods,
    removePaymentMethod,
    address
  };
}
