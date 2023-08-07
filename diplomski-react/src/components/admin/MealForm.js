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

  const isVegetarianCheckbox = useRef();
  const isVeganCheckbox = useRef();
  const isKosherCheckbox = useRef();
  const isLactoseFreeCheckbox = useRef();
  const isGlutenFreeCheckbox = useRef();

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();

  const [currentMeal, setCurrentMeal] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();

    if (!ingredients || ingredients.length === 0) {
      setError('Please fill in ingredients');
    } else {
      const randOrders = Math.floor(Math.random() * (200 - 50) + 20);
      const randLikes = Math.floor(Math.random() * (50 - 5) + 5);

      const meal = {
        ...(props.method === 'PATCH' && { id: props.meal.id }),
        name: nameInput.current.value,
        category: selectedCategory,
        ingredients: ingredients,
        price: priceInput.current.value,
        calories: caloriesInput.current.value,
        isVegetarian: isVegetarianCheckbox.current.checked,
        isVegan: isVeganCheckbox.current.checked,
        isKosher: isKosherCheckbox.current.checked,
        isLactoseFree: isLactoseFreeCheckbox.current.checked,
        isGlutenFree: isGlutenFreeCheckbox.current.checked,
        ...(props.method === 'POST' && { numOfOrders: randOrders }),
        ...(props.method === 'POST' && { numOfLikes: randLikes }),
        ...(props.method === 'POST' && { isAvailable: true }),
      };

      props.onSubmit(meal, props.method);
    }
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

  useEffect(() => {
    //for edit meal form, set up existing values
    if (props.meal) {
      setIngredients(props.meal.ingredients);
      setCurrentMeal(props.meal);
      setSelectedCategory(props.meal.category);
      console.log(currentMeal);
      window.scroll(0, 0);
    }
  }, [props.meal, currentMeal]);

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
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          ref={nameInput}
          defaultValue={props.meal ? currentMeal.name : ''}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
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
          defaultValue={props.meal ? currentMeal.price : ''}
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
          defaultValue={props.meal ? currentMeal.calories : ''}
          required
        />
      </div>
      <div>
        <label htmlFor="vegetarian">Vegetarian:</label>
        <input
          type="checkbox"
          id="vegetarian"
          ref={isVegetarianCheckbox}
          defaultChecked={props.meal ? currentMeal.isVegetarian : false}
        />
        <label htmlFor="vegan">Vegan:</label>
        <input
          type="checkbox"
          id="vegan"
          ref={isVeganCheckbox}
          defaultChecked={props.meal ? currentMeal.isVegan : false}
        />
        <label htmlFor="kosher">Kosher:</label>
        <input
          type="checkbox"
          id="kosher"
          ref={isKosherCheckbox}
          defaultChecked={props.meal ? currentMeal.isKosher : false}
        />
        <label htmlFor="lactoseFree">Lactose free:</label>
        <input
          type="checkbox"
          id="lactoseFree"
          ref={isLactoseFreeCheckbox}
          defaultChecked={props.meal ? currentMeal.isLactoseFree : false}
        />
        <label htmlFor="glutenFree">Gluten free:</label>
        <input
          type="checkbox"
          id="glutenFree"
          ref={isGlutenFreeCheckbox}
          defaultChecked={props.meal ? currentMeal.isGlutenFree : false}
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default MealNewForm;
