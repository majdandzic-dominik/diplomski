import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MealsPage from './pages/MealsPage';
import IngredientsPage from './pages/IngredientsPage';
import CategoriesPage from './pages/CategoriesPage';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
