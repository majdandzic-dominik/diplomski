import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart-context';
import { AuthContext } from '../../context/auth-context';

import classes from './MealsList.module.css';

const MealsList = (props) => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  //cart
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { userData, userDataLoading, updateOnlineUserData } =
    useContext(AuthContext);

  const likeHandler = (item) => {
    let newData = { ...userData };
    let likes = [];
    if (userData.likes) {
      likes = [...userData.likes];

      if (!likes.includes(item.id)) {
        likes.push(item.id);
        updateItemLikes(item, 'ADD');
      } else {
        likes.splice(likes.indexOf(item.id), 1);
        updateItemLikes(item, 'REMOVE');
      }
      updateOnlineUserData({ ...newData, likes: likes });
    } else {
      likes.push(item.id);
      updateOnlineUserData({ ...newData, likes: likes });
    }
  };

  const updateItemLikes = async (item, method) => {
    setError(null);
    let url = apiURL + 'meals/' + item.id + '.json';
    let likes = item.numOfLikes;
    if (method === 'ADD') {
      likes += 1;
    }
    if (method === 'REMOVE') {
      likes -= 1;
    }

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ ...item, numOfLikes: likes }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Could not save data!');
      }

      props.updateItems();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setMeals(props.items);
  }, [props.items]);

  return (
    <div className={classes.container}>
      {error && <p className={classes.error}>{error}</p>}
      <ul className={classes.list}>
        {meals.map((item) => (
          <li
            key={item.id}
            className={`${
              !item.isAvailable ? classes['unavailable-item'] : ''
            }`}
          >
            {props.isAdmin && (
              <div className={classes.availability}>
                {item.isAvailable ? (
                  <span>Available</span>
                ) : (
                  <span>Unavailable</span>
                )}

                <button
                  onClick={() =>
                    props.onChangeAvailabiliy(
                      { ...item, isAvailable: !item.isAvailable },
                      'PATCH'
                    )
                  }
                >
                  {item.isAvailable ? 'Set unavailable' : 'Set available'}
                </button>
              </div>
            )}
            {!props.isAdmin && !item.isAvailable && (
              <div className={classes.unavailable}>
                <span>Unavailable</span>
              </div>
            )}

            <div className={classes.info}>
              <div className={classes['title-category']}>
                <h3>{item.name}</h3>
                <p className={classes.category}>({item.category})</p>
              </div>
              <div>
                <p>
                  <strong>Price: </strong>${item.price}
                </p>
                <p>
                  <strong>Calories: </strong>
                  {item.calories} kcal
                </p>
              </div>
            </div>

            <div className={classes.ingredients}>
              <p>Ingredients:</p>
              <ul>
                {item.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {(item.isVegetarian ||
              item.isVegan ||
              item.isKosher ||
              item.isGlutenFree ||
              item.isLactoseFree) && (
              <ul className={classes.checks}>
                {item.isVegetarian && <li>Vegetarian</li>}
                {item.isVegan && <li>Vegan</li>}
                {item.isKosher && <li>Kosher</li>}
                {item.isGlutenFree && <li>Gluten free</li>}
                {item.isLactoseFree && <li>Lactose free</li>}
              </ul>
            )}
            {props.isAdmin && (
              <div className={classes.likes}>
                <p>
                  <strong>Likes: </strong>
                  {item.numOfLikes}
                </p>
                <p>
                  <strong>Orders: </strong>
                  {item.numOfOrders}
                </p>
              </div>
            )}
            {props.isAdmin && (
              <div className={classes.actions}>
                <button
                  onClick={() => props.onEdit(item)}
                  className={classes['btn-edit']}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    props.onDelete(item.id);
                  }}
                  className={classes['btn-delete']}
                >
                  Delete
                </button>
              </div>
            )}
            {!props.isAdmin &&
              (!userDataLoading ? (
                <div className={classes.likes}>
                  <p>
                    <strong>Likes: </strong>
                    {item.numOfLikes}
                  </p>
                  <button
                    onClick={() => {
                      likeHandler(item);
                    }}
                  >
                    {userData.likes && userData.likes.includes(item.id)
                      ? 'Remove Like'
                      : 'Like'}
                  </button>
                </div>
              ) : (
                <div>Sending data...</div>
              ))}
            {!props.isAdmin && item.isAvailable && (
              <div className={classes['cart-controls']}>
                {!cartItems.find((i) => i.id === item.id) ? (
                  <button
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    Add to cart
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        removeFromCart(item);
                      }}
                    >
                      -
                    </button>
                    <span>
                      {cartItems.find((i) => i.id === item.id).quantity}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealsList;
