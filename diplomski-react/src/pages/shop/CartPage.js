import { useContext, useState } from 'react';
import { CartContext } from '../../context/cart-context';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Cart</h1>
      {error && <p>{error}</p>}
      <Link to={'..'}>Back</Link>
      <button onClick={clearCart}>Clear cart</button>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index}>
              <h3>Name: {item.name}</h3>
              <p>Price: ${item.price}</p>
              <div>
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
          <h3>Cart is empty</h3>
        )}
      </div>
      <div>Total: ${getCartTotal()}</div>
      <button onClick={orderHandler}>Order</button>
    </div>
  );
};

export default CartPage;
