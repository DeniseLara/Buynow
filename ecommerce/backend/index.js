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
      .doc(userId)
      .collection('orders')
      .doc(orderId); 

    await orderRef.update({ 
      status: 'paid',
      paymentId: event.data.object.id, 
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
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
    const { userId, orderId } = req.body;

    if (!userId || !orderId) {
      return res.status(400).json({ error: 'Faltan datos: userId u orderId' });
    }

    // buscar la orden en firestore
    const orderDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .collection('orders')
      .doc(orderId)
      .get();

    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'La orden no existe en la base de datos' });
    }

    const orderData = orderDoc.data();
    
    // obtener el total pagado
    const totalAmount = Math.round(parseFloat(orderData.totalPaid) * 100);

    if (isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ error: 'El monto de la orden es inválido o 0' });
    }

    // Crear el intento
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      metadata: { userId, orderId },
    });

    res.send({ 
      clientSecret: paymentIntent.client_secret, 
      total: orderData.totalPaid 
    });

  } catch (err) {
    console.error("Error en create-payment-intent:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);