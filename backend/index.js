const express = require('express');
const app = express();

require('dotenv').config();
const Stripe = require('stripe');

const cors = require('cors');  
app.use(cors({
  origin: ['https://buynow-gy88.onrender.com','http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3001/'], // Especifica el puerto de tu frontend
}));

app.use(express.json());

// Middleware para evitar cache 
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Expires', '0');
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'); 
  next();
});

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Ruta GET para evitar el error "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente');
});

// Ruta para crear el payment intent
app.post('/create-payment-intent', async (req, res) => {

  try {
    const { amount, userId, shippingCost } = req.body;  // Ahora esperamos también el userId
    
     // Verificar si el amount es válido
     if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount debe ser mayor que 0' });
    }

    // Verificar que el userId sea válido 
     if (!userId) {
      return res.status(400).json({ error: 'userId es necesario' });
    }

    // Lógica para calcular el costo de envío según el monto
    const expectedShipping = amount >= 5000 ? 0 : 599; // Si el monto >= 50 USD => envío gratis (en centavos)
     
    if (shippingCost !== expectedShipping) {
      return res.status(400).json({ error: `El costo de envío debería ser ${expectedShipping / 100} USD` });
    }

    const amountInCents = amount + shippingCost  

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { 
      userId,
      shippingCost: shippingCost.toString() },  
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);