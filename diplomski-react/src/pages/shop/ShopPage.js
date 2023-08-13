import { useCallback, useEffect, useRef, useState } from 'react';
import MealsList from '../../components/admin/MealsList';
import {
  checkCalorieRange,
  checkDietPreference,
  checkExcludedIngredients,
  checkIncludedIngredients,
  compareByCaloriesAscending,
  compareByCaloriesDescending,
  compareByNameAscending,
  compareByNameDescending,
  compareByPopularityAscending,
  compareByPopularityDescending,
  compareByPriceAscending,
  compareByPriceDescending,
} from '../../helpers/compare-functions';
import SearchFilterForm from '../../components/shop/SearchFilterForm';

const ShopPage = () => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [options, setOptions] = useState({
    includedIngredients: [],
    excludedIngredients: [],
    caloriesMin: 0,
    caloriesMax: 10000,
    isVegetarian: false,
    isVegan: false,
    isKosher: false,
    isLactoseFree: false,
    isGlutenFree: false,
  });
  const [filterFormVisible, setFilterFormVisible] = useState(false);
  const selectedSort = useRef();

  const sortOptions = [
    'Name[A-Z]',
    'Name[Z-A]',
    'Price[LOW-HIGH]',
    'Price[HIGH-LOW]',
    'Calories[LOW-HIGH]',
    'Calories[HIGH-LOW]',
    'Popularity[LOW-HIGH]',
    'Popularity[HIGH-LOW]',
  ];

  const sortMeals = (meals) => {
    let newMeals = [...meals];
    switch (selectedSort.current.value) {
      case 'Name[A-Z]':
        newMeals.sort(compareByNameAscending);
        break;
      case 'Name[Z-A]':
        newMeals.sort(compareByNameDescending);
        break;
      case 'Price[LOW-HIGH]':
        newMeals.sort(compareByPriceAscending);
        break;
      case 'Price[HIGH-LOW]':
        newMeals.sort(compareByPriceDescending);
        break;
      case 'Calories[LOW-HIGH]':
        newMeals.sort(compareByCaloriesAscending);
        break;
      case 'Calories[HIGH-LOW]':
        newMeals.sort(compareByCaloriesDescending);
        break;
      case 'Popularity[LOW-HIGH]':
        newMeals.sort(compareByPopularityAscending);
        break;
      case 'Popularity[HIGH-LOW]':
        newMeals.sort(compareByPopularityDescending);
        break;
    }
    return newMeals;
    // setMeals(newMeals);
  };

  const filterMeals = useCallback((initialData, options) => {
    let filteredMeals = [];

    initialData.forEach((meal) => {
      if (
        checkIncludedIngredients(
          meal.ingredients,
          options.includedIngredients
        ) &&
        checkExcludedIngredients(
          meal.ingredients,
          options.excludedIngredients
        ) &&
        checkCalorieRange(meal, options.caloriesMin, options.caloriesMax) &&
        checkDietPreference(meal, options)
      ) {
        filteredMeals.push(meal);
      }
    });

    return filteredMeals;
    // setMeals(filteredMeals);
  }, []);

  const updateMeals = useCallback(
    (initialData, options) => {
      setMeals(sortMeals(filterMeals(initialData, options)));
    },
    [filterMeals]
  );

  //fetch items
  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch(apiURL + 'meals.json');

      if (!response.ok) {
        throw new Error('Could not fetch data!');
      }
      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          category: data[key].category,
          ingredients: data[key].ingredients,
          price: data[key].price,
          calories: data[key].calories,
          isAvailable: data[key].isAvailable,
          isGlutenFree: data[key].isGlutenFree,
          isKosher: data[key].isKosher,
          isLactoseFree: data[key].isLactoseFree,
          isVegan: data[key].isVegan,
          isVegetarian: data[key].isVegetarian,
          numOfLikes: data[key].numOfLikes,
          numOfOrders: data[key].numOfOrders,
        });
      }
      updateMeals(loadedMeals, options);
    } catch (error) {
      setError(error.message);
    }
  }, [updateMeals, options]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <div>
      <h1>SHOP</h1>
      {error && <p>{error}</p>}
      {!filterFormVisible && (
        <button onClick={() => setFilterFormVisible(true)}>Show filter</button>
      )}
      {filterFormVisible && (
        <SearchFilterForm
          onSubmit={setOptions}
          onClose={setFilterFormVisible}
        />
      )}
      <div>
        Sort by:
        <select ref={selectedSort} onChange={fetchHandler}>
          {sortOptions.map((value, index) => (
            <option key={index}>{value}</option>
          ))}
        </select>
      </div>
      <MealsList isAdmin={false} items={meals} updateItems={fetchHandler} />
    </div>
  );
};

export default ShopPage;
