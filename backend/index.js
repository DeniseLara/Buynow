const express = require('express');
const app = express();

require('dotenv').config();
const Stripe = require('stripe');

const cors = require('cors');  
app.use(cors({
  origin: ['https://buynow-hqd4.onrender.com','http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3001/'], // Especifica el puerto de tu frontend
}));

app.use(express.json());

// Middleware para evitar cache (desarrollo y producción seguro)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  //res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'); // Seguridad en las conexiones HTTPS
  next();
});

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Ruta GET para evitar el error "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente');
});

// Tu ruta para crear el Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  console.log('Solicitud recibida en /create-payment-intent');

  try {
    const { amount, userId, shippingCost } = req.body;  // Ahora esperamos también el userId
    
     // Verifica si el amount y userId son válidos
     if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount debe ser mayor que 0' });
    }

     // Verifica que el userId sea válido (opcional, dependiendo de tu lógica de negocio)
     if (!userId) {
      return res.status(400).json({ error: 'userId es necesario' });
    }

    // Lógica para calcular el costo de envío según el monto
    const expectedShipping = amount >= 5000 ? 0 : 599; // Si el monto >= 50 USD => envío gratis (en centavos)
     
     // Verifica si el costo de envío enviado es el esperado
     if (shippingCost !== expectedShipping) {
      return res.status(400).json({ error: `El costo de envío debería ser ${expectedShipping / 100} USD` });
    }

    // Total en centavos: productos + envío
    const amountInCents = amount + shippingCost  // Esto convierte 55.99 dólares a 5599 centavos

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { 
        userId,
      shippingCost: shippingCost.toString() },  // Asociamos el userId al PaymentIntent
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
