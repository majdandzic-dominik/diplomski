import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminDashboardPage, {
  adminDashboardPageLoader,
} from './pages/admin/AdminDashboardPage';
import MealsPage from './pages/admin/MealsPage';
import IngredientsPage from './pages/admin/IngredientsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import ShopPage from './pages/shop/ShopPage';
import CartPage from './pages/shop/CartPage';
import UserPage, { shopPageLoader } from './pages/shop/UserPage';
import SignUpPage from './pages/auth/SignUpPage';
import LoginPage, { loginPageLoader } from './pages/auth/LoginPage';
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
        loader: adminDashboardPageLoader,
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
        loader: shopPageLoader,
        children: [
          { index: true, element: <ShopPage /> },
          { path: 'cart', element: <CartPage /> },
        ],
      },
      {
        path: 'signup',
        element: <SignUpPage />,
        loader: loginPageLoader,
      },
      {
        path: 'login',
        element: <LoginPage />,
        loader: loginPageLoader,
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
