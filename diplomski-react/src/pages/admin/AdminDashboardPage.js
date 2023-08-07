import { Outlet } from 'react-router-dom';
import AdminDashboardNav from '../../components/admin/AdminDashboardNav';

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminDashboardNav />
      <Outlet />
    </div>
  );
};

export default AdminDashboardPage;
