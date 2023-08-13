import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart-context';
import { AuthContext } from '../../context/auth-context';

const MealsList = (props) => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  //cart
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { userData, updateOnlineUserData } = useContext(AuthContext);

  const likeHandler = (item) => {
    let newData = { ...userData };
    let likes = [];
    if (userData.likes) {
      console.log('likes' + userData.likes);
      likes = [...userData.likes];
      console.log('likes' + likes);
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
    <div>
      <h2>MEALS LIST</h2>
      {error && <p>{error}</p>}
      <ul>
        {meals.map((item) => (
          <li key={item.id}>
            <div>
              {item.isAvailable ? 'Available' : 'Unavailable'}
              {props.isAdmin && (
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
              )}
            </div>
            <div>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>{item.calories} kcal</p>
              <p>Category: {item.category}</p>
            </div>

            <ul>
              Ingredients:
              {item.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <div>
              <p>{item.isVegetarian && 'Vegetarian'}</p>
              <p>{item.isVegan && 'Vegan'}</p>
              <p>{item.isKosher && 'Kosher'}</p>
              <p>{item.isGlutenFree && 'Gluten free'}</p>
              <p>{item.isLactoseFree && 'Lactose free'}</p>
            </div>
            {props.isAdmin && (
              <div>
                <p>Likes: {item.numOfLikes}</p>
                <p>Orders: {item.numOfOrders}</p>
              </div>
            )}
            {props.isAdmin && (
              <div>
                <button
                  onClick={() => {
                    props.onDelete(item.id);
                  }}
                >
                  Delete
                </button>
                <button onClick={() => props.onEdit(item)}>Edit</button>
              </div>
            )}
            {!props.isAdmin && (
              <div>
                <p>Likes: {item.numOfLikes}</p>
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
            )}
            {!props.isAdmin && item.isAvailable && (
              <div>
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
