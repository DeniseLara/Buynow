import { ProfileProvider } from './context/ProfileContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import { PaymentModalProvider } from './context/PaymentModalContext.jsx';
import { PaymentProvider } from './context/PaymentContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function AppProviders({ children }) {
    return (
      <AuthProvider>
        <ProfileProvider>
          <FavoritesProvider>
            <CartProvider>
              <SearchProvider>
                <OrdersProvider>
                  <PaymentModalProvider>
                    <PaymentProvider>
                      {children}
                    </PaymentProvider>
                  </PaymentModalProvider>
                </OrdersProvider>
              </SearchProvider>
            </CartProvider>
          </FavoritesProvider>
        </ProfileProvider>
      </AuthProvider>
    );
}

export default AppProviders;