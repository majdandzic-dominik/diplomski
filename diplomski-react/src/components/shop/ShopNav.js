import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart-context';
import { AuthContext } from '../../context/auth-context';

const ShopNav = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  };


  //cart
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Restaurant</h1>
      <div>
        <Link to={'cart'}>Cart: ({cartItems.length})</Link>
        <div>
          <p>Signed in as: {currentUser.email}</p>
          <button onClick={logoutHandler}>Log out</button>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ShopNav;
