import { useCallback, useEffect, useRef, useState } from 'react';
import IngredientList from './IngredientList';

import classes from './MealForm.module.css';

const MealNewForm = (props) => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [error, setError] = useState(null);

  const titleRef = useRef();

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

      console.log(meal);
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
        setSelectedCategory(loadedData[0]);
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

      titleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
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
    <div className={classes.container}>
      <h3 ref={titleRef}>{props.method === 'POST' ? 'Add' : 'Edit'}</h3>
      <form onSubmit={submitHandler} className={classes.form}>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.input}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            ref={nameInput}
            defaultValue={props.meal ? currentMeal.name : ''}
            required
          />
        </div>
        <div className={classes.select}>
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
        <div className={classes.select}>
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
        <div className={classes.input}>
          <label htmlFor="price">Price/$:</label>
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
        <div className={classes.input}>
          <label htmlFor="calories">Calories/kcal:</label>
          <input
            type="number"
            id="calories"
            ref={caloriesInput}
            min={0}
            defaultValue={props.meal ? currentMeal.calories : ''}
            required
          />
        </div>
        <div className={classes.checks}>
          <div className={classes.check}>
            <input
              type="checkbox"
              id="vegetarian"
              ref={isVegetarianCheckbox}
              defaultChecked={props.meal ? currentMeal.isVegetarian : false}
            />
            <label htmlFor="vegetarian">Vegetarian</label>
          </div>
          <div className={classes.check}>
            <input
              type="checkbox"
              id="vegan"
              ref={isVeganCheckbox}
              defaultChecked={props.meal ? currentMeal.isVegan : false}
            />
            <label htmlFor="vegan">Vegan</label>
          </div>
          <div className={classes.check}>
            <input
              type="checkbox"
              id="kosher"
              ref={isKosherCheckbox}
              defaultChecked={props.meal ? currentMeal.isKosher : false}
            />
            <label htmlFor="kosher">Kosher</label>
          </div>
          <div className={classes.check}>
            <input
              type="checkbox"
              id="lactoseFree"
              ref={isLactoseFreeCheckbox}
              defaultChecked={props.meal ? currentMeal.isLactoseFree : false}
            />
            <label htmlFor="lactoseFree">Lactose free</label>
          </div>
          <div className={classes.check}>
            <input
              type="checkbox"
              id="glutenFree"
              ref={isGlutenFreeCheckbox}
              defaultChecked={props.meal ? currentMeal.isGlutenFree : false}
            />
            <label htmlFor="glutenFree">Gluten free</label>
          </div>
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes['btn-save']}>
            Save
          </button>
          <button
            type="button"
            onClick={props.onCancel}
            className={classes['btn-cancel']}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealNewForm;
