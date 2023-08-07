import { useEffect, useState } from 'react';

const MealsList = (props) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    setMeals(props.items);
  }, [props.items]);

  return (
    <div>
      <h2>MEALS LIST</h2>
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
                <button>Like</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealsList;
