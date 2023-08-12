import { Outlet } from 'react-router-dom';
import { CartProvider } from '../../context/cart-context';
import ShopNav from '../../components/shop/ShopNav';

const UserPage = () => {
  return (
    <CartProvider>
      <ShopNav/>
      <Outlet />
    </CartProvider>
  );
};

export default UserPage;
