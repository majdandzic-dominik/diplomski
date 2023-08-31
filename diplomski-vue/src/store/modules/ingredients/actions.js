import { compareByValueAscending } from '@/helpers/compare-functions';

export default {
  async loadIngredients(context) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'ingredients.json'
    );

    if (!response.ok) {
      throw new Error('Could not fetch data!');
    }
    const data = await response.json();

    const loadedIngredients = [];

    for (const key in data) {
      loadedIngredients.push({
        id: key,
        value: data[key].value,
      });
    }
    loadedIngredients.sort(compareByValueAscending);

    context.commit('setIngredients', loadedIngredients);
  },
  async addIngredient(context, item) {
    console.log(item.value);
    if (context.state.ingredients.some((e) => e.value === item.value)) {
      throw new Error('Ingredient already exists');
    } else {
      const response = await fetch(
        'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
          'ingredients.json',
        {
          method: 'POST',
          body: JSON.stringify(item),
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
  async editIngredient(context, item) {
    if (context.state.ingredients.some((e) => e.value === item.value)) {
      throw new Error('Ingredient already exists');
    } else {
      const response = await fetch(
        'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
          'ingredients/' +
          item.id +
          '.json',
        {
          method: 'PATCH',
          body: JSON.stringify(item),
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
  async deleteIngredient(context, item) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'ingredients/' +
        item.id +
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
