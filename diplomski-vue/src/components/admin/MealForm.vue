<template>
  <div :class="$style.container">
    <h3>{{ method }}</h3>
    <form :class="$style.form" @submit.prevent="submitHandler">
      <p v-if="error" :class="$style.error">{{ error }}</p>
      <!-- name -->
      <div :class="$style.input">
        <label htmlFor="name">Name:</label>
        <input v-model="name" type="text" id="name" required />
      </div>
      <!-- categories -->
      <div :class="$style.select">
        <label htmlFor="category">Category:</label>
        <select v-model="category" id="category">
          <option v-for="c in categories" :key="c">{{ c.value }}</option>
        </select>
      </div>
      <!-- ingredients -->
      <div :class="$style.select">
        <label htmlFor="ingredient">Ingredients:</label>
        <select v-model="selectedIngredient" id="ingredient">
          <option v-for="i in ingredients" :key="i">{{ i.value }}</option>
        </select>
        <button @click="addIngredient" type="button">Add</button>
        <ingredients-list
          :ingredients="selectedIngredients"
          @remove-handler="removeIngredient"
        ></ingredients-list>
      </div>
      <!-- price and calories -->
      <div :class="$style.input">
        <label htmlFor="price">Price/$:</label>
        <input
          v-model="price"
          type="number"
          id="price"
          min="0"
          step="0.01"
          required
        />
      </div>
      <div :class="$style.input">
        <label htmlFor="calories">Calories/kcal:</label>
        <input
          v-model="calories"
          type="number"
          id="calories"
          min="0"
          step="1"
          required
        />
      </div>
      <!-- diet checks -->
      <div :class="$style.checks">
        <div :class="$style.check">
          <input v-model="isVegetarian" type="checkbox" id="vegetarian" />
          <label htmlFor="vegetarian">Vegetarian</label>
        </div>
        <div :class="$style.check">
          <input v-model="isVegan" type="checkbox" id="vegan" />
          <label htmlFor="vegan">Vegan</label>
        </div>
        <div :class="$style.check">
          <input v-model="isKosher" type="checkbox" id="kosher" />
          <label htmlFor="kosher">Kosher</label>
        </div>
        <div :class="$style.check">
          <input v-model="isLactoseFree" type="checkbox" id="lactoseFree" />
          <label htmlFor="lactoseFree">Lactose free</label>
        </div>
        <div :class="$style.check">
          <input v-model="isGlutenFree" type="checkbox" id="glutenFree" />
          <label htmlFor="glutenFree">Gluten free</label>
        </div>
      </div>
      <!-- actions -->
      <div :class="$style.actions">
        <button type="submit" :class="$style['btn-save']">Save</button>
        <button
          @click="closeHandler"
          type="button"
          :class="$style['btn-cancel']"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import IngredientsList from './IngredientsList.vue';

export default {
  emits: ['submitHandler', 'closeHandler'],
  components: {
    IngredientsList,
  },
  props: ['method', 'meal'],
  data() {
    return {
      error: null,
      name: '',
      category: '',
      selectedIngredient: '',
      selectedIngredients: [],
      price: 0,
      calories: 0,
      isVegetarian: false,
      isVegan: false,
      isKosher: false,
      isLactoseFree: false,
      isGlutenFree: false,
    };
  },
  computed: {
    categories() {
      return this.$store.getters['categories/categories'];
    },
    ingredients() {
      return this.$store.getters['ingredients/ingredients'];
    },
  },
  created() {
    this.loadCategories();
    this.loadIngredients();
    if (this.meal) {
      this.setUpForm(this.meal);
    }
  },
  watch: {
    meal(newMeal) {
      this.setUpForm(newMeal);
    },
  },
  methods: {
    async loadCategories() {
      this.error = null;
      try {
        await this.$store.dispatch('categories/loadCategories');
        if (this.categories.length > 0) {
          this.category = this.categories[0].value;
        }
      } catch (e) {
        this.error = e.message;
      }
    },
    async loadIngredients() {
      this.error = null;
      try {
        await this.$store.dispatch('ingredients/loadIngredients');
        if (this.ingredients.length > 0) {
          this.selectedIngredient = this.ingredients[0].value;
        }
      } catch (e) {
        this.error = e.message;
      }
    },
    addIngredient() {
      this.error = null;
      if (!this.selectedIngredients.includes(this.selectedIngredient)) {
        this.selectedIngredients.push(this.selectedIngredient);
      } else {
        this.error = 'Can not add duplicate ingredients.';
      }
    },
    removeIngredient(item) {
      const index = this.selectedIngredients.indexOf(item.value);
      const newList = this.selectedIngredients.filter(
        (value, i) => i !== index
      );
      this.selectedIngredients = newList;
    },
    submitHandler() {
      if (this.selectedIngredients.length > 0) {
        this.$emit('submitHandler', {
          ...(this.meal && { id: this.meal.id }),
          name: this.name,
          category: this.category,
          ingredients: this.selectedIngredients,
          price: this.price,
          calories: this.calories,
          isVegetarian: this.isVegetarian,
          isVegan: this.isVegan,
          isKosher: this.isKosher,
          isLactoseFree: this.isLactoseFree,
          isGlutenFree: this.isGlutenFree,
        });
      } else {
        this.error = 'Please fill in ingredients';
      }
    },
    closeHandler() {
      this.$emit('closeHandler');
    },
    setUpForm() {
      if (this.meal) {
        console.log(this.meal.name);
        this.name = this.meal.name;
        this.category = this.meal.category;
        this.selectedIngredients = this.meal.ingredients;
        this.price = this.meal.price;
        this.calories = this.meal.calories;
        this.isVegetarian = this.meal.isVegetarian;
        this.isVegan = this.meal.isVegan;
        this.isKosher = this.meal.isKosher;
        this.isLactoseFree = this.meal.isLactoseFree;
        this.isGlutenFree = this.meal.isGlutenFree;
      }
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
  background-color: var(--color-primary-100);
  margin-bottom: 10px;
  padding: 0 1rem;
  border-radius: 5px;
  border: 1px var(--color-primary-400) solid;
}

.container h3 {
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: underline;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
}

.actions button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.1rem 1rem;
  border-radius: 4px;
  color: black;
  border: none;
  height: auto;
}

.actions button.btn-save {
  background-color: var(--color-edit-primary);
}

.actions button.btn-cancel {
  background-color: var(--color-delete-primary);
  margin-left: 5px;
}

.actions button.btn-save:hover {
  background-color: var(--color-edit-secondary);
}

.actions button.btn-cancel:hover {
  background-color: var(--color-delete-secondary);
  margin-left: 5px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form label {
  font-weight: bold;
}

.form input,
.form select {
  font: inherit;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.select {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.select select {
  padding: 0.35rem;
}

.select > button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.2rem 1rem;
  border-radius: 4px;
  background-color: var(--color-gray-300);
  color: black;
  border: none;
  margin-left: 5px;
}

.select > button:hover {
  background-color: var(--color-gray-400);
}

.select ul {
  width: 100%;
}

.checks {
  background-color: white;
  width: fit-content;
  padding: 1rem;
  border-radius: 10px;
  margin: auto;
}

.check {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.check input:hover {
  cursor: pointer;
}

.check input {
  width: 20px;
  height: 20px;
}
</style>
