import { createStore } from 'vuex';

import ingredientsModule from './modules/ingredients/index.js';
import categoriesModule from './modules/categories/index.js';
import mealsModule from './modules/meals/index.js';
import cartModule from './modules/cart/index.js';

const store = createStore({
  modules: {
    ingredients: ingredientsModule,
    categories: categoriesModule,
    meals: mealsModule,
    cart: cartModule,
  },
});

export default store;
