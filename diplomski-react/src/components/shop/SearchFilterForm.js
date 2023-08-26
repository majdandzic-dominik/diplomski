import { useCallback, useEffect, useRef, useState } from 'react';
import IngredientList from '../admin/IngredientList';

import classes from './SearchFilterForm.module.css';

const SearchFilterForm = (props) => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [error, setError] = useState(null);
  const includeIngredientInput = useRef();
  const excludeIngredientInput = useRef();

  const caloriesMin = useRef();
  const caloriesMax = useRef();

  const isVegetarianCheckbox = useRef();
  const isVeganCheckbox = useRef();
  const isKosherCheckbox = useRef();
  const isLactoseFreeCheckbox = useRef();
  const isGlutenFreeCheckbox = useRef();

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [ingredientsToInclude, setIngredientsToInclude] = useState([]);
  const [ingredientsToExclude, setIngredientsToExclude] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (isCalorieRangeValid()) {
      const filterOptions = {
        includedIngredients: ingredientsToInclude,
        excludedIngredients: ingredientsToExclude,
        caloriesMin: caloriesMin.current.value,
        caloriesMax: caloriesMax.current.value,
        isVegetarian: isVegetarianCheckbox.current.checked,
        isVegan: isVeganCheckbox.current.checked,
        isKosher: isKosherCheckbox.current.checked,
        isLactoseFree: isLactoseFreeCheckbox.current.checked,
        isGlutenFree: isGlutenFreeCheckbox.current.checked,
      };

      props.onSubmit(filterOptions);
    }
  };

  //get ingredients
  const fetchHandler = useCallback(async () => {
    let apiSuffix = 'ingredients.json';
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

      setAvailableIngredients(loadedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchHandler('ingredients');
    fetchHandler('categories');
  }, [fetchHandler]);

  //add ingredient to list
  const addIngredient = (newIngredient, type) => {
    setError(null);
    if (type === 'INCLUDE') {
      if (
        !ingredientsToInclude.includes(newIngredient) &&
        !ingredientsToExclude.includes(newIngredient)
      ) {
        setIngredientsToInclude((prevState) => [...prevState, newIngredient]);
      } else {
        setError('Can not add duplicate ingredients.');
      }
    }
    if (type === 'EXCLUDE') {
      if (
        !ingredientsToInclude.includes(newIngredient) &&
        !ingredientsToExclude.includes(newIngredient)
      ) {
        setIngredientsToExclude((prevState) => [...prevState, newIngredient]);
      } else {
        setError('Can not add duplicate ingredients.');
      }
    }
  };
  //delete ingredient from list
  const deleteIngredient = (value, type) => {
    if (type === 'INCLUDE') {
      const index = ingredientsToInclude.indexOf(value);
      setIngredientsToInclude((prevState) =>
        prevState.filter((value, i) => i !== index)
      );
    }
    if (type === 'EXCLUDE') {
      const index = ingredientsToExclude.indexOf(value);
      setIngredientsToExclude((prevState) =>
        prevState.filter((value, i) => i !== index)
      );
    }
  };

  //check for valid calorie range
  const isCalorieRangeValid = () => {
    setError('');
    if (+caloriesMin.current.value >= +caloriesMax.current.value) {
      setError('Minimum calories can not be larger than maximum calories.');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setIngredientsToExclude([]);
    setIngredientsToInclude([]);
    caloriesMin.current.value = 0;
    caloriesMax.current.value = 10000;
    isVegetarianCheckbox.current.checked = false;
    isVeganCheckbox.current.checked = false;
    isKosherCheckbox.current.checked = false;
    isLactoseFreeCheckbox.current.checked = false;
    isGlutenFreeCheckbox.current.checked = false;
  };
  return (
    <div className={classes.container}>
      <h3>Filter</h3>
      <form onSubmit={submitHandler} className={classes.form}>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.actions}>
          <button
            type="button"
            onClick={resetForm}
            className={classes['btn-reset']}
          >
            Reset filter
          </button>
          <button
            type="button"
            onClick={() => props.onClose(false)}
            className={classes['btn-cancel']}
          >
            Close filter
          </button>
        </div>
        <div className={classes.select}>
          <label htmlFor="included-ingredients">Include ingredients:</label>
          <div>
            <select id="included-ingredients" ref={includeIngredientInput}>
              {availableIngredients.map((value, id) => (
                <option key={id}>{value}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                addIngredient(includeIngredientInput.current.value, 'INCLUDE');
              }}
            >
              Add
            </button>
          </div>
          {ingredientsToInclude.length !== 0 && (
            <IngredientList
              ingredients={ingredientsToInclude}
              onDelete={deleteIngredient}
              type="INCLUDE"
            />
          )}
        </div>

        <div className={classes.select}>
          <label htmlFor="excluded-ingredients">Exclude ingredients:</label>
          <div>
            <select id="excluded-ingredients" ref={excludeIngredientInput}>
              {availableIngredients.map((value, id) => (
                <option key={id}>{value}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                addIngredient(excludeIngredientInput.current.value, 'EXCLUDE');
              }}
            >
              Add
            </button>
          </div>
          {ingredientsToExclude.length !== 0 && (
            <IngredientList
              ingredients={ingredientsToExclude}
              onDelete={deleteIngredient}
              type="EXCLUDE"
            />
          )}
        </div>
        <div className={classes.calories}>
          <div>
            <label htmlFor="calories">Calories min:</label>
            <input
              ref={caloriesMin}
              type="number"
              id="calories"
              min={0}
              max={9999}
              onChange={isCalorieRangeValid}
              defaultValue={0}
              required
            />
          </div>
          <div>
            <label htmlFor="calories">Calories max:</label>
            <input
              ref={caloriesMax}
              type="number"
              id="calories"
              min={1}
              max={10000}
              onChange={isCalorieRangeValid}
              defaultValue={10000}
              required
            />
          </div>
        </div>
        <div className={classes.checks}>
          <div className={classes.check}>
            <input type="checkbox" id="vegetarian" ref={isVegetarianCheckbox} />
            <label htmlFor="vegetarian">Vegetarian:</label>
          </div>
          <div className={classes.check}>
            <input type="checkbox" id="vegan" ref={isVeganCheckbox} />
            <label htmlFor="vegan">Vegan:</label>
          </div>
          <div className={classes.check}>
            <input type="checkbox" id="kosher" ref={isKosherCheckbox} />
            <label htmlFor="kosher">Kosher:</label>
          </div>
          <div className={classes.check}>
            <input
              type="checkbox"
              id="lactoseFree"
              ref={isLactoseFreeCheckbox}
            />
            <label htmlFor="lactoseFree">Lactose free:</label>
          </div>
          <div className={classes.check}>
            <input type="checkbox" id="glutenFree" ref={isGlutenFreeCheckbox} />
            <label htmlFor="glutenFree">Gluten free:</label>
          </div>
        </div>

        <div className={classes.actions}>
          <button type="submit" className={classes['btn-apply']}>
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilterForm;
