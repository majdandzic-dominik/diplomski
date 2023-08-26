import { Outlet } from 'react-router-dom';
import ShopNav from '../../components/shop/ShopNav';

const UserPage = () => {
  return (
    <>
      <ShopNav />
      <Outlet />
    </>
  );
};

export default UserPage;
