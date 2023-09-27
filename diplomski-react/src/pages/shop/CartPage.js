import { useContext, useState } from 'react';
import { CartContext } from '../../context/cart-context';
import { Link, useNavigate } from 'react-router-dom';

import classes from './CartPage.module.css';

const CartPage = () => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const updateNumOfOrders = async (meal, increment) => {
    setError(null);
    let url = apiURL + 'meals/' + meal.id + '.json';

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          ...meal,
          numOfOrders: meal.numOfOrders + increment,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Could not save data!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const orderHandler = () => {
    setError(null);
    if (cartItems.length <= 0) {
      setError('Please add items to cart');
    } else {
      var result = window.confirm('Are you sure you want to order?');
      if (result) {
        cartItems.forEach((item) => {
          let validItem = { ...item };
          delete validItem.quantity;
          console.log(item);
          updateNumOfOrders(validItem, item.quantity);
        });
        clearCart();
        navigate('/shop');
      }
    }
  };

  return (
    <div className={classes.container}>
      <h2>Cart</h2>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.actions}>
        <Link to={'..'}>Back</Link>
        <button onClick={clearCart} className={classes['btn-reset']}>
          Clear cart
        </button>
      </div>
      <div className={classes.items}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className={classes.item}>
              <div className={classes.info}>
                <h3>{item.name}</h3>
                <p>(${item.price})</p>
              </div>
              <div className={classes['cart-controls']}>
                <button
                  onClick={() => {
                    removeFromCart(item);
                  }}
                >
                  -
                </button>
                <span>{cartItems.find((i) => i.id === item.id).quantity}</span>
                <button
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className={classes.item}>Cart is empty</h3>
        )}
      </div>
      <div className={classes.price}>
        <strong>Total: </strong>${getCartTotal()}
      </div>
      <div className={classes.apply}>
        <button onClick={orderHandler} className={classes['btn-apply']}>
          Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
