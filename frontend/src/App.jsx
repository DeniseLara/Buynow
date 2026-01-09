//import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './context/AuthContext';

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer'
import Loading from './components/ui/Loading'
import HomePublic from "./pages/public/HomePublic";
import HomeAuthenticated from "./pages/private/HomeAuthenticated";
import Signup from "./pages/public/Signup";
import Login from "./pages/public/Login";
import Profile from "./pages/private/Profile";
import ProductsPage from "./pages/shared/ProductsPage";
import CartPageWrapper from "./CartPageWrapper";
import ProductDetails from "./pages/shared/ProductDetails";
import FavoritesPage from "./pages/shared/FavoritesPage";
import MyOrders from "./pages/private/MyOrders";

function App() {
  const { user, loading } = useAuthContext();
  
  if (loading) return <Loading/>;

  return (
    <div className="path-container">
      <Navbar user={user}/>
      
      <main className='path'>
        <Routes>
          <Route 
            path="/" 
            element={user ? <HomeAuthenticated user={user} /> : <HomePublic />} 
          />
          
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />

          <Route 
            path="/signup" 
            element={user ? <Navigate to="/" /> : <Signup />} 
          />

          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login />} 
          />

          <Route 
            path="/cart" 
            element={user ? <CartPageWrapper /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/products" 
            element={<ProductsPage user={user} />} 
          />

          <Route 
            path="/favorites" 
            element={<FavoritesPage user={user} />} 
          />

          <Route 
            path="/orders" 
            element={user ? <MyOrders /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/products/details" 
            element={<ProductDetails user={user} />} 
          />
      </Routes>
      </main>

      <Footer/>
    </div>
  );
}

export default App
