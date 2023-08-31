<template>
  <div :class="$style.container">
    <ul :class="$style.list">
      <li
        v-for="meal in meals"
        :key="meal.id"
        :class="!meal.isAvailable ? $style['unavailable-item'] : ''"
      >
        <!-- availability admin -->
        <div v-if="isAdmin" :class="$style.availability">
          <span>{{ meal.isAvailable ? 'Available' : 'Unavailable' }}</span>
          <button>
            {{ meal.isAvailable ? 'Set unavailable' : 'Set available' }}
          </button>
        </div>
        <!-- availability user -->
        <div v-if="!isAdmin && !meal.isAvailable" :class="$style.unavailable">
          <span>Unavailable</span>
        </div>

        <!-- meal info -->
        <div :class="$style.info">
          <div :class="$style['title-category']">
            <h3>{{ meal.name }}</h3>
            <p :class="$style.category">{{ meal.category }}</p>
          </div>
          <div>
            <p><strong>Price: </strong>${{ meal.price }}</p>
            <p>
              <strong>Calories: </strong>
              {{ meal.calories }} kcal
            </p>
          </div>
        </div>

        <!-- ingredients -->
        <div :class="$style.ingredients">
          <p>Ingredients:</p>
          <ul>
            <li v-for="ingredient in meal.ingredients" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>
        </div>

        <!-- diets -->
        <ul
          v-if="
            meal.isVegetarian ||
            meal.isVegan ||
            meal.isKosher ||
            meal.isGlutenFree ||
            meal.isLactoseFree
          "
          :class="$style.checks"
        >
          <li v-if="meal.isVegetarian">Vegetarian</li>
          <li v-if="meal.isVegan">Vegan</li>
          <li v-if="meal.isKosher">Kosher</li>
          <li v-if="meal.isGlutenFree">Gluten free</li>
          <li v-if="meal.isLactoseFree">Lactose free</li>
        </ul>

        <!-- likes admin -->
        <div v-if="isAdmin" :class="$style.likes">
          <p>
            <strong>Likes: </strong>
            {{ meal.numOfLikes }}
          </p>
          <p>
            <strong>Orders: </strong>
            {{ meal.numOfOrders }}
          </p>
        </div>

        <!-- controls admin -->
        <div v-if="isAdmin" :class="$style.actions">
          <button @click="editHandler(meal)" :class="$style['btn-edit']">
            Edit
          </button>
          <button @click="deleteHandler(meal)" :class="$style['btn-delete']">
            Delete
          </button>
        </div>

        <!-- likes user -->
        <div v-if="!isAdmin" :class="$style.likes">
          <p>
            <strong>Likes: </strong>
            {{ meal.numOfLikes }}
          </p>
          <button>Like</button>
        </div>

        <!-- cart controls user -->
        <div
          v-if="!isAdmin && meal.isAvailable"
          :class="$style['cart-controls']"
        >
          <button v-if="!getItem(meal)" @click="addToCart(meal)" type="button">
            Add to cart
          </button>
          <div v-else>
            <button @click="removeFromCart(meal)" type="button">-</button>
            <span>
              {{ getItem(meal).quantity }}
            </span>
            <button @click="addToCart(meal)" type="button">+</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  emits: ['editHandler', 'deleteHandler'],
  props: ['meals', 'isAdmin'],
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItem: 'cart/getItem',
    }),
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart',
    }),
    editHandler(meal) {
      this.$emit('editHandler', {
        id: meal.id,
        name: meal.name,
        category: meal.category,
        ingredients: meal.ingredients,
        price: meal.price,
        calories: meal.calories,
        isVegetarian: meal.isVegetarian,
        isVegan: meal.isVegan,
        isKosher: meal.isKosher,
        isLactoseFree: meal.isLactoseFree,
        isGlutenFree: meal.isGlutenFree,
      });
    },
    deleteHandler(meal) {
      this.$emit('deleteHandler', { id: meal.id });
    },
  },
};
</script>

<style module>
.error {
  width: 100%;
  color: var(--color-error-primary);
  background-color: var(--color-error-secondary);
  padding: 4px;
  text-align: center;
  border-radius: 4px;
  border: 1px var(--color-error-primary) solid;
}

.container {
  width: 100%;
}

.list > li {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: var(--color-primary-300);
  margin-bottom: 10px;
  padding: 1rem;
  border-radius: 5px;
  border: 2px var(--color-primary-600) solid;
}

li.unavailable-item {
  background-color: var(--color-gray-300);
  border: 2px var(--color-gray-600) solid;
}

.unavailable {
  align-self: flex-end;
  background-color: var(--color-error-secondary);
  border: 1px solid var(--color-error-primary);
  color: var(--color-error-primary);
  font-weight: bold;
  padding: 0.2rem 1rem;
  border-radius: 5px;
}

.availability {
  align-self: flex-end;
  background-color: white;
  padding: 0.2rem 1rem;
  border-radius: 5px;
}

.availability > span {
  font-weight: bold;
  text-decoration: underline;
}

.availability > button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  background-color: var(--color-gray-200);
  color: black;
  border: none;
  margin-left: 5px;
}

.availability > button:hover {
  background-color: var(--color-gray-300);
}

.info {
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 20px 0 10px 0;
  border-radius: 10px;
  padding: 5px 15px;
}

.info h3 {
  font-size: 1.6rem;
  line-height: 1.6rem;
  word-break: break-all;
  word-wrap: break-word;
  margin: 0;
}

.info p {
  margin: 0;
}

.title-category {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column-reverse;
}

.category {
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
}

.ingredients {
  background-color: white;
  border-radius: 10px;
  padding: 0 1rem;
  margin: 10px 0;
}

.ingredients p {
  margin: 10px 0;
  font-weight: bold;
}

.ingredients ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.ingredients ul li {
  margin-right: 10px;
  margin-bottom: 5px;
  background-color: var(--color-gray-200);
  border-radius: 10px;
  padding: 0.2rem 1rem;
}

.checks {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-color: white;
  margin: 10px 0;
  border-radius: 10px;
  padding: 5px 15px;
}

.checks li {
  font-weight: bold;
  text-decoration: underline;
}

.likes {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.likes * {
  margin: 0;
}

.likes button {
  align-self: flex-end;
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  background-color: var(--color-primary-700);
  color: black;
  border: none;
  margin-bottom: 10px;
}

.likes button:hover {
  background-color: var(--color-primary-900);
}

.actions {
  align-self: flex-end;
  margin-top: 20px;
}

.actions button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  color: black;
  border: none;
}

.actions button.btn-edit {
  background-color: var(--color-edit-primary);
  margin-right: 5px;
  border: 1px solid green;
}

.actions button.btn-delete {
  background-color: var(--color-delete-primary);
  border: 1px solid red;
}

.actions button.btn-edit:hover {
  background-color: var(--color-edit-secondary);
}

.actions button.btn-delete:hover {
  background-color: var(--color-delete-secondary);
}

.cart-controls {
  align-self: flex-end;
}

.cart-controls button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.2rem 1rem;
  border-radius: 4px;
  background-color: var(--color-gray-300);
  color: black;
  border: none;
}

.cart-controls button:hover {
  background-color: var(--color-gray-400);
}

.cart-controls span {
  font-weight: bold;
  background-color: white;
  padding: 0.2rem 0.5rem;
  margin: 0 5px;
}
</style>
