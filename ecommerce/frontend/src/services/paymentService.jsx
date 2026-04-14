export const processPayment = async (userId, orderId) => {
  if (!userId) throw new Error("No se pudo obtener el ID del usuario.");

  // Obtener el client secret desde el backend
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      userId, 
      orderId
    }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al crear el PaymentIntent');
  }

  return await response.json();
};

   


