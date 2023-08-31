import { compareByValueAscending } from '@/helpers/compare-functions';

export default {
  async loadCategories(context) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'categories.json'
    );

    if (!response.ok) {
      throw new Error('Could not fetch data!');
    }
    const data = await response.json();

    const loadedCategories = [];

    for (const key in data) {
      loadedCategories.push({
        id: key,
        value: data[key].value,
      });
    }
    loadedCategories.sort(compareByValueAscending);

    context.commit('setCategories', loadedCategories);
  },
  async addCategory(context, item) {
    console.log(item.value);
    if (context.state.categories.some((e) => e.value === item.value)) {
      throw new Error('Category already exists');
    } else {
      const response = await fetch(
        'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
          'categories.json',
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
  async editCategory(context, item) {
    if (context.state.categories.some((e) => e.value === item.value)) {
      throw new Error('Category already exists');
    } else {
      const response = await fetch(
        'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
          'categories/' +
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
  async deleteCategory(context, item) {
    const response = await fetch(
      'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/' +
        'categories/' +
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
