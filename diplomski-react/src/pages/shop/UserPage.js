import { Outlet, useNavigate } from 'react-router-dom';
import ShopNav from '../../components/shop/ShopNav';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth-context';

const UserPage = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      if (userData.isAdmin) {
        navigate('/admin');
      } else {
        console.log('STAY SHOP');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, userData]);
  return (
    <>
      <ShopNav />
      <Outlet />
    </>
  );
};

export default UserPage;

// export const userPageLoader = async () => {
//   console.log(auth.currentUser);
//   if (auth.currentUser) {
//     const user = await database
//       .ref('/users/' + auth.currentUser.uid)
//       .once('value')
//       .then((snapshot) => {
//         return snapshot.val();
//       });

//     if (user.isAdmin) {
//       console.log('to admin');
//       return redirect('/admin');
//     } else {
//       console.log('stay on shop');
//       return null;
//     }
//   }
//   console.log('to login');
//   return redirect('/login');
// };
