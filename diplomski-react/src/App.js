import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import MealsPage from './pages/admin/MealsPage';
import IngredientsPage from './pages/admin/IngredientsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import ShopPage from './pages/shop/ShopPage';

const router = createBrowserRouter([
  {
    path: '/admin',
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
    path: '/shop',
    element: <ShopPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
