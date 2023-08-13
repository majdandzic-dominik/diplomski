import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import MealsPage from './pages/admin/MealsPage';
import IngredientsPage from './pages/admin/IngredientsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import ShopPage from './pages/shop/ShopPage';
import CartPage from './pages/shop/CartPage';
import UserPage from './pages/shop/UserPage';
import SignUpPage from './pages/auth/SignUpPage';
import LoginPage from './pages/auth/LoginPage';
import { AuthProvider } from './context/auth-context';
import MainPage from './pages/MainPage';
import { CartProvider } from './context/cart-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: 'admin',
        element: <AdminDashboardPage />,
        children: [
          { path: 'meals', element: <MealsPage /> },
          { path: 'categories', element: <CategoriesPage /> },
          {
            path: 'ingredients',
            element: <IngredientsPage />,
          },
        ],
      },
      {
        path: 'shop',
        element: <UserPage />,
        children: [
          { index: true, element: <ShopPage /> },
          { path: 'cart', element: <CartPage /> },
        ],
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
