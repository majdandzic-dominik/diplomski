import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart-context';
import { AuthContext } from '../../context/auth-context';

import classes from './ShopNav.module.css';

const ShopNav = () => {
  const [error, setError] = useState('');
  const { currentUser, logout, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setError('');

    try {
      await logout();
      setUserData(null);
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  //cart
  const { cartItems } = useContext(CartContext);

  return (
    <header className={classes.header}>
      <h1>Restaurant</h1>
      <div className={classes.info}>
        <Link to={'cart'}>Cart: ({cartItems.length})</Link>
        {currentUser && (
          <>
            <p><strong>Email: </strong>{currentUser.email}</p>
            <button onClick={logoutHandler}>Log out</button>
          </>
        )}
        {error && <p>{error}</p>}
      </div>
    </header>
  );
};

export default ShopNav;
