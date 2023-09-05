import { Outlet } from 'react-router-dom';
import AdminDashboardNav from '../../components/admin/AdminDashboardNav';

const AdminDashboardPage = () => {
  // useEffect(() => {
  //   if (userData) {
  //     if (userData.isAdmin) {
  //       console.log('STAY ADMIN');
  //     } else {
  //       navigate('/shop');
  //     }
  //   } else {
  //     navigate('/login');
  //   }
  // }, [navigate, userData]);
  return (
    <>
      <AdminDashboardNav />
      <Outlet />
    </>
  );
};

export default AdminDashboardPage;

// export const adminDashboardPageLoader = async () => {
//   console.log('CURRENT USER>' + auth.currentUser);
//   if (auth.currentUser) {
//     const user = await database
//       .ref('/users/' + auth.currentUser.uid)
//       .once('value')
//       .then((snapshot) => {
//         return snapshot.val();
//       });

//     if (user.isAdmin) {
//       console.log('stay admin');
//       return null;
//     } else {
//       console.log('to shop');
//       return redirect('/shop');
//     }
//   }
//   console.log('to login');
//   return redirect('/login');
// };
