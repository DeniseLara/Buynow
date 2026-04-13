const express = require('express');
const app = express();

require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const cors = require('cors');  
app.use(cors({
  origin: [
    'https://buynow-gy88.onrender.com',
    'http://localhost:5173', 
    'http://127.0.0.1:5173', 
    'http://localhost:3001'
  ], 
}));

// Inicializar Firebase Admin
const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
  const { userId, orderId } = event.data.object.metadata;
  
  try {
    // Acceso directo a la subcolección del usuario
    const orderRef = admin.firestore()
      .collection('users')
      .doc(usferId)
      .collection('orders')
      .doc(orderId)
      .update({ 
        status: 'paid',
        paymentId: event.data.object.id, 
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    await orderRef.update({ 
      status: 'paid',
      paymentIntentId: event.data.object.id, 
      paidAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`Orden ${orderId} actualizada a pagada.`);
  } catch (error) {
    console.error("Error actualizando Firebase:", error);
  }
}

  res.json({ received: true });
});

app.use(express.json());

// Middleware para evitar cache 
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Expires', '0');
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'); 
  next();
});

app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente');
});

// Ruta para crear el payment intent
app.post('/create-payment-intent', async (req, res) => {

  try {
    const { amount, userId, shippingCost, orderId } = req.body;  
    
     // Verificar si el amount es válido
     if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount debe ser mayor que 0' });
    }

    // Verificar que el userId sea válido 
     if (!userId) {
      return res.status(400).json({ error: 'userId es necesario' });
    }

    // Lógica para calcular el costo de envío según el monto
    const expectedShipping = amount >= 5000 ? 0 : 599; // Si el monto >= 50 USD => envío gratis 
     
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
      orderId,
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