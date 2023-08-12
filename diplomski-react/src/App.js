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

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminDashboardPage />,
    id: 'root',
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
    path: '/shop',
    element: <UserPage />,
    children: [
      { index: true, element: <ShopPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
