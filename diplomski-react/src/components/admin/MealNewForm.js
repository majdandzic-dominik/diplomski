import { useCallback, useEffect, useRef, useState } from 'react';
import IngredientList from './IngredientList';

const MealNewForm = (props) => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [error, setError] = useState(null);

  const nameInput = useRef();
  const priceInput = useRef();
  const caloriesInput = useRef();
  const ingredientInput = useRef();
  const categoryInput = useRef();

  const isVegetarianCheckbox = useRef(false);
  const isVeganCheckbox = useRef(false);
  const isKosherCheckbox = useRef(false);
  const isLactoseFreeCheckbox = useRef(false);
  const isGlutenFreeCheckbox = useRef(false);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    const randOrders = Math.floor(Math.random() * (200 - 50) + 20);
    const randLikes = Math.floor(Math.random() * (50 - 5) + 5);

    const meal = {
      name: nameInput.current.value,
      category: categoryInput.current.value,
      ingredients: ingredients,
      price: priceInput.current.value,
      calories: caloriesInput.current.value,
      isVegetarian: isVegetarianCheckbox.current.checked,
      isVegan: isVeganCheckbox.current.checked,
      isKosher: isKosherCheckbox.current.checked,
      isLactoseFree: isLactoseFreeCheckbox.current.checked,
      isGlutenFree: isGlutenFreeCheckbox.current.checked,
      numOfOrders: randOrders,
      numOfLikes: randLikes,
    };

    props.onSubmit(meal);
  };

  //get ingredients
  const fetchHandler = useCallback(async (type) => {
    let apiSuffix = '';
    if (type === 'ingredients') {
      apiSuffix = 'ingredients.json';
    }
    if (type === 'categories') {
      apiSuffix = 'categories.json';
    }
    try {
      const response = await fetch(apiURL + apiSuffix);

      if (!response.ok) {
        throw new Error('Could not fetch data!');
      }
      const data = await response.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push(data[key].value);
      }

      loadedData.sort();

      if (type === 'ingredients') {
        setAvailableIngredients(loadedData);
      }
      if (type === 'categories') {
        setAvailableCategories(loadedData);
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchHandler('ingredients');
    fetchHandler('categories');
  }, [fetchHandler]);

  //add ingredient to list
  const addIngredient = (newIngredient) => {
    setError(null);
    if (!ingredients.includes(newIngredient)) {
      setIngredients((prevState) => [...prevState, newIngredient]);
    } else {
      setError('Can not add duplicate ingredients.');
    }
  };
  //delete ingredient from list
  const deleteIngredient = (value) => {
    const index = ingredients.indexOf(value);
    setIngredients((prevState) => prevState.filter((value, i) => i !== index));
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameInput} required />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" ref={categoryInput}>
          {availableCategories.map((value, id) => (
            <option key={id}>{value}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <select id="ingredients" ref={ingredientInput}>
          {availableIngredients.map((value, id) => (
            <option key={id}>{value}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            addIngredient(ingredientInput.current.value);
          }}
        >
          Add
        </button>
        {ingredients.length !== 0 && (
          <IngredientList
            ingredients={ingredients}
            onDelete={deleteIngredient}
          />
        )}
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          ref={priceInput}
          min={0}
          step={0.01}
          required
        />
      </div>
      <div>
        <label htmlFor="calories">Calories:</label>
        <input
          type="number"
          id="calories"
          ref={caloriesInput}
          min={0}
          required
        />
      </div>
      <div>
        <label htmlFor="vegetarian">Vegetarian:</label>
        <input type="checkbox" id="vegetarian" ref={isVegetarianCheckbox} />
        <label htmlFor="vegan">Vegan:</label>
        <input type="checkbox" id="vegan" ref={isVeganCheckbox} />
        <label htmlFor="kosher">Kosher:</label>
        <input type="checkbox" id="kosher" ref={isKosherCheckbox} />
        <label htmlFor="lactoseFree">Lactose free:</label>
        <input type="checkbox" id="lactoseFree" ref={isLactoseFreeCheckbox} />
        <label htmlFor="glutenFree">Gluten free:</label>
        <input type="checkbox" id="glutenFree" ref={isGlutenFreeCheckbox} />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default MealNewForm;
