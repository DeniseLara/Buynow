# 🛒 BuyNow

**BuyNow** es una simulación de una tienda online desarrollada como proyecto personal para mi portafolio. Está construida con **React + Vite** en el frontend, utiliza **Firebase** para autenticación y base de datos, y un pequeño backend en **Express + Node.js** para la lógica de pagos simulados con **Stripe**.

---

## 🚀 Tecnologías utilizadas

- **Frontend**
  - React
  - Vite
  - JavaScript
  - CSS
- **Backend**
  - Node.js
  - Express
  - Stripe (para pagos simulados)
- **Base de datos y autenticación**
  - Firebase

---

## 🌐 Estructura del sitio

El sitio cuenta con **10 páginas en total**, divididas entre **públicas** y **privadas**:

### 🔓 Páginas públicas

1. **Home** – Página principal para todo público.
2. **Login** – Autenticación con Firebase.
3. **Register** – Registro de nuevos usuarios.
4. **Products** – Catálogo de productos con categorías.
5. **Wishlist** – Lista de favoritos (funciona para usuarios autenticados y no autenticados).
6. **Product Details** – Detalle de un producto con imagen, descripción, rating y opción para seleccionar cantidad y agregar al carrito.

### 🔒 Páginas privadas (requieren login)

7. **Home (usuario autenticado)** – Vista personalizada del home.
8. **Cart** – Muestra productos en el carrito con cálculo total y botón para pagar.
9. **Profile** – Perfil del usuario (email, dirección, métodos de pago, enlaces a órdenes y favoritos).
10. **Orders** – Lista de órdenes simuladas del usuario con opción para cancelar.

---

## 💳 Pagos simulados

BuyNow utiliza **Stripe** en modo de prueba para simular pagos.  
**No se realiza ningún pago real.**  
El backend en Node.js expone un endpoint que crea un `PaymentIntent` falso solo para efectos demostrativos.

---

## 📦 Funcionalidades destacadas

- Registro e inicio de sesión con Firebase.
- Persistencia de favoritos incluso sin login.
- Carrito de compras con cálculo de envío.
- Formulario de pago funcional con integración a Stripe en modo prueba.
- Perfil de usuario editable.
- Órdenes simuladas con opción de cancelación.
- UI responsiva y moderna.

---

## 🚀 Despliegue

El frontend y backend están desplegados en producción usando **Render**.

---

## ✨ Autor

Proyecto desarrollado por **Denise Lara** — *Frontend Developer* 🧑‍💻  
Forma parte de mi portafolio personal.  
¡Gracias por visitarlo!
