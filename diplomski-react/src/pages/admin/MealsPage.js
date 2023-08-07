import { useCallback, useEffect, useState } from 'react';
import MealForm from '../../components/admin/MealForm';
import MealsList from '../../components/admin/MealsList';

const MealsPage = () => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [error, setError] = useState(null);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);

  const [meals, setMeals] = useState([]);
  const [mealForEdit, setMealForEdit] = useState();

  const showAddForm = () => {
    setError(null);
    setAddFormVisible(true);
  };

  const hideAddForm = () => {
    setError(null);
    setAddFormVisible(false);
  };

  const showEditForm = () => {
    setError(null);
    setEditFormVisible(true);
  };

  const hideEditForm = () => {
    setError(null);
    setEditFormVisible(false);
  };

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
      setMeals(loadedMeals);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  //add item
  const addHandler = async (meal, method) => {
    setError(null);
    if (method === 'POST' && meals.some((e) => e.name === meal.name)) {
      setError('Meal already exists');
    } else {
      let url = apiURL + 'meals.json';
      if (method === 'PATCH') {
        url = apiURL + 'meals/' + meal.id + '.json';
      }
      try {
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(meal),
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Could not save data!');
        }

        fetchHandler();
        if (method === 'POST') {
          hideAddForm();
        }
        if (method === 'PATCH') {
          hideEditForm();
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  //delete item
  const deleteHandler = async (id) => {
    var result = window.confirm('Want to delete?');
    if (result) {
      setError(null);

      try {
        const response = await fetch(apiURL + 'meals/' + id + '.json', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Could not delete data!');
        }

        fetchHandler();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const setUpEditForm = (meal) => {
    setMealForEdit(meal);
    showEditForm();
  };

  return (
    <div>
      {error && <p>{error}</p>}

      {!addFormVisible && <button onClick={showAddForm}>Add</button>}

      {addFormVisible && (
        <MealForm
          method={'POST'}
          onSubmit={addHandler}
          onCancel={hideAddForm}
        />
      )}

      {editFormVisible && (
        <MealForm
          method={'PATCH'}
          onSubmit={addHandler}
          meal={mealForEdit}
          onCancel={hideEditForm}
        />
      )}
      <MealsList
        isAdmin={true}
        items={meals}
        onDelete={deleteHandler}
        onEdit={setUpEditForm}
        onChangeAvailabiliy={addHandler}
      />
    </div>
  );
};

export default MealsPage;
