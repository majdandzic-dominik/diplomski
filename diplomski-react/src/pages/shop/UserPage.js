import { Outlet, redirect } from 'react-router-dom';
import ShopNav from '../../components/shop/ShopNav';
import { auth, database } from '../../firebase';

const UserPage = () => {
  return (
    <>
      <ShopNav />
      <Outlet />
    </>
  );
};

export default UserPage;

export const shopPageLoader = async () => {
  if (auth.currentUser) {
    const user = await database
      .ref('/users/' + auth.currentUser.uid)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });

    if (user.isAdmin) {
      return redirect('/admin');
    } else {
      return null;
    }
  }

  return redirect('/login');
};
