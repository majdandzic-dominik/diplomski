import { compareByNameAscending } from '@/helpers/compare-functions';

export default {
  async loadMeals(context) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'meals.json'
    );

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
    loadedMeals.sort(compareByNameAscending);

    context.commit('setMeals', loadedMeals);
  },
  async addMeal(context, meal) {
    if (context.state.meals.some((e) => e.name.toLowerCase() === meal.name.toLowerCase())) {
      throw new Error('Meal already exists');
    } else {
      const response = await fetch(
        'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
          'meals.json',
        {
          method: 'POST',
          body: JSON.stringify(meal),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Could not save data!');
      }
    }
  },
  async editMeal(context, meal) {
    const validMeals = context.state.meals.filter((m) => m.id != meal.id);

    if (
      validMeals.some((e) => e.name.toLowerCase() === meal.name.toLowerCase())
    ) {
      throw new Error('Meal already exists');
    } else {
      const response = await fetch(
        'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
          'meals/' +
          meal.id +
          '.json',
        {
          method: 'PATCH',
          body: JSON.stringify(meal),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Could not save data!');
      }
    }
  },
  async updateMealOrders(context, meal) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'meals/' +
        meal.id +
        '.json',
      {
        method: 'PATCH',
        body: JSON.stringify(meal),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Could not save data!');
    }
  },
  async deleteMeal(context, meal) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'meals/' +
        meal.id +
        '.json',
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Could not save data!');
    }
  },
};
