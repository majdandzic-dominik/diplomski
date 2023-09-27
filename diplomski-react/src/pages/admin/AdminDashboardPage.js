import { Outlet, redirect } from 'react-router-dom';
import AdminDashboardNav from '../../components/admin/AdminDashboardNav';
import { auth, database } from '../../firebase';

const AdminDashboardPage = () => {
  return (
    <>
      <AdminDashboardNav />
      <Outlet />
    </>
  );
};

export default AdminDashboardPage;

export const adminDashboardPageLoader = async () => {
  if (auth.currentUser) {
    const user = await database
      .ref('/users/' + auth.currentUser.uid)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });

    if (user.isAdmin) {
      return null;
    } else {
      return redirect('/shop');
    }
  }

  return redirect('/login');
};
