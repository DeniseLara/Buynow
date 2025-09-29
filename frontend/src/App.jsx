import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from './context/AuthContext';

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer'
import Loading from './components/ui/Loading'

const HomePublic = lazy(() => import('./pages/public/HomePublic'));
const HomeAuthenticated = lazy(() => import('./pages/private/HomeAuthenticated'));
const Signup = lazy(() => import('./pages/public/Signup'));
const Login = lazy(() => import('./pages/public/Login'));
const Profile = lazy(() => import('./pages/private/Profile'));
const ProductsPage = lazy(() => import('./pages/shared/ProductsPage'));
const CartPageWrapper = lazy(() => import('./CartPageWrapper'));
const ProductDetails = lazy(() => import('./pages/shared/ProductDetails'));
const FavoritesPage = lazy(() => import('./pages/shared/FavoritesPage'));
const MyOrders = lazy(() => import('./pages/private/MyOrders'));

function App() {
  const { user, loading } = useAuth();
  if (loading) return <Loading/>;

  return (
    <div className="path-container">
      <Navbar user={user}/>
      
      <Suspense fallback={<Loading />}>
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
      </Suspense>

      <Footer/>
    </div>
  );
}

export default App
