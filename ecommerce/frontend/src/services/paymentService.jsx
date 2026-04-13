export const processPayment = async (totals, userId, orderId) => {
  if (!userId) throw new Error("No se pudo obtener el ID del usuario.");

  const amountInCents = Math.round(totals.subtotal * 100);  // Multiplicar por 100 para convertir a centavos
  const shippingCostInCents = Math.round(totals.shipping * 100);  // Shipping en centavos ✅

  // Obtener el client secret desde tu backend, enviando el ID del usuario
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      amount: amountInCents, 
      userId, 
      shippingCost: shippingCostInCents ,
      orderId
    }),  // Enviar el userId junto con el monto
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al crear el PaymentIntent');
  }

  const { clientSecret } = await response.json();

  return { status: "succeeded", clientSecret };
};

// Calcular el total de la compra
const calculateCartTotal = (cart) => {
  if (!Array.isArray(cart)) return 0;

  return cart.reduce((total, item, index) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);

    if (isNaN(price) || isNaN(quantity)) {
      return total;
    }

    return total + price * quantity;
  }, 0);
};


   


