export const processPayment = async (cart, shippingCost, userId) => {
  if (!userId) throw new Error("No se pudo obtener el ID del usuario.");
  
const totalAmount = calculateCartTotal(cart);
const parsedShippingCost = parseFloat(shippingCost);

if (isNaN(parsedShippingCost)) {
  throw new Error("El costo de envío es inválido.");
}

const amountInCents = Math.round(totalAmount * 100);  // Multiplicar por 100 para convertir a centavos
const shippingCostInCents = shippingCost;  // Convertir el costo de envío a centavos

const totalWithShipping = amountInCents + shippingCostInCents;

if (totalWithShipping <= 0) {
  throw new Error("El monto total debe ser mayor que 0.");
}

// Obtener el client secret desde tu backend, enviando el ID del usuario
const response = await fetch('http://localhost:3001/create-payment-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    amount: amountInCents, 
    userId, 
    shippingCost:shippingCostInCents }),  // Enviar el userId junto con el monto
  });

if (!response.ok) {
  const errorData = await response.json();
  console.error("Error en respuesta del backend:", errorData);
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
      console.warn(`Item inválido [${index}]`, item);
      return total;
    }

    return total + price * quantity;
  }, 0);
};


   


