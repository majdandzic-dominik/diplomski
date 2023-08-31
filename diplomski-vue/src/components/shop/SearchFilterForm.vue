<template>
  <div :class="$style.container">
    <h3>Filter</h3>

    <form @submit.prevent="submitHandler" :class="$style.form">
      <p v-if="error" :class="$style.error">{{ error }}</p>

      <!-- reset i close -->
      <div :class="$style.actions">
        <button @click="resetForm" :class="$style['btn-reset']" type="button">
          Reset filter
        </button>
        <button
          @click="closeHandler"
          :class="$style['btn-cancel']"
          type="button"
        >
          Close filter
        </button>
      </div>

      <!-- include ingredients -->
      <div :class="$style.select">
        <label htmlFor="included-ingredients">Include ingredients:</label>
        <div>
          <select v-model="includeIngredient" id="included-ingredients">
            <option v-for="i in ingredients" :key="i">{{ i.value }}</option>
          </select>
          <button @click="addIngredientToInclude" type="button">Add</button>
          <ingredients-list
            :ingredients="includedIngredients"
            type="INCLUDE"
            @remove-handler="removeIngredientToInclude"
          ></ingredients-list>
        </div>
      </div>

      <!-- exclude ingredients -->
      <div :class="$style.select">
        <label htmlFor="excluded-ingredients">Exclude ingredients:</label>
        <div>
          <select v-model="excludeIngredient" id="excluded-ingredients">
            <option v-for="i in ingredients" :key="i">{{ i.value }}</option>
          </select>
          <button @click="addIngredientToExclude" type="button">Add</button>
          <ingredients-list
            :ingredients="excludedIngredients"
            type="EXCLUDE"
            @remove-handler="removeIngredientToExclude"
          ></ingredients-list>
        </div>
      </div>

      <!-- calories -->
      <div :class="$style.calories">
        <div>
          <label htmlFor="calories-min">Calories min:</label>
          <input
            v-model="caloriesMin"
            type="number"
            id="calories-min"
            min="{0}"
            max="{9999}"
            step="1"
            required
          />
        </div>
        <div>
          <label htmlFor="calories-max">Calories max:</label>
          <input
            v-model="caloriesMax"
            type="number"
            id="calories-max"
            min="{1}"
            max="{1000}"
            step="1"
            required
          />
        </div>
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
          <input v-model="isLactoseFree" type="checkbox" id="lactose-free" />
          <label htmlFor="lactose-free">Lactose free</label>
        </div>
        <div :class="$style.check">
          <input v-model="isGlutenFree" type="checkbox" id="gluten-free" />
          <label htmlFor="gluten-free">Gluten free</label>
        </div>
      </div>

      <!-- apply -->
      <div :class="$style.actions">
        <button type="submit" :class="$style['btn-apply']">Apply</button>
      </div>
    </form>
  </div>
</template>

<script>
import IngredientsList from '../admin/IngredientsList.vue';

export default {
  emits: ['submitHandler', 'closeHandler'],
  components: { IngredientsList },
  data() {
    return {
      error: null,
      includeIngredient: '',
      includedIngredients: [],
      excludeIngredient: '',
      excludedIngredients: [],
      caloriesMin: 0,
      caloriesMax: 10000,
      isVegetarian: false,
      isVegan: false,
      isKosher: false,
      isLactoseFree: false,
      isGlutenFree: false,
    };
  },
  computed: {
    ingredients() {
      return this.$store.getters['ingredients/ingredients'];
    },
  },
  created() {
    this.loadIngredients();
  },
  methods: {
    async loadIngredients() {
      this.error = null;
      try {
        await this.$store.dispatch('ingredients/loadIngredients');
        if (this.ingredients.length > 0) {
          this.includeIngredient = this.ingredients[0].value;
          this.excludeIngredient = this.ingredients[0].value;
        }
      } catch (e) {
        this.error = e.message;
      }
    },
    addIngredientToInclude() {
      this.error = null;
      if (
        !this.includedIngredients.includes(this.includeIngredient) &&
        !this.excludedIngredients.includes(this.includeIngredient)
      ) {
        this.includedIngredients.push(this.includeIngredient);
      } else {
        this.error = 'Can not add duplicate ingredients.';
      }
    },
    removeIngredientToInclude(item) {
      const index = this.includedIngredients.indexOf(item.value);
      const newList = this.includedIngredients.filter(
        (value, i) => i !== index
      );
      this.includedIngredients = newList;
    },
    addIngredientToExclude() {
      this.error = null;
      if (
        !this.includedIngredients.includes(this.excludeIngredient) &&
        !this.excludedIngredients.includes(this.excludeIngredient)
      ) {
        this.excludedIngredients.push(this.excludeIngredient);
      } else {
        this.error = 'Can not add duplicate ingredients.';
      }
    },
    removeIngredientToExclude(item) {
      const index = this.excludedIngredients.indexOf(item.value);
      const newList = this.excludedIngredients.filter(
        (value, i) => i !== index
      );
      this.excludedIngredients = newList;
    },
    isCalorieRangeValid() {
      this.error = null;
      if (this.caloriesMin >= this.caloriesMax) {
        this.error =
          'Minimum calories can not be larger than maximum calories.';
        return false;
      }
      return true;
    },
    submitHandler() {
      if (this.isCalorieRangeValid()) {
        this.$emit('submitHandler', {
          includedIngredients: this.includedIngredients,
          excludedIngredients: this.excludedIngredients,
          caloriesMin: this.caloriesMin,
          caloriesMax: this.caloriesMax,
          isVegetarian: this.isVegetarian,
          isVegan: this.isVegan,
          isKosher: this.isKosher,
          isLactoseFree: this.isLactoseFree,
          isGlutenFree: this.isGlutenFree,
        });
      }
    },
    closeHandler() {
      this.$emit('closeHandler');
    },
    resetForm() {
      this.error = null;
      this.includeIngredient = this.ingredients[0].value;
      this.excludeIngredient = this.ingredients[0].value;
      this.includedIngredients = [];
      this.excludedIngredients = [];
      this.caloriesMin = 0;
      this.caloriesMax = 10000;
      this.isVegetarian = false;
      this.isVegan = false;
      this.isKosher = false;
      this.isLactoseFree = false;
      this.isGlutenFree = false;
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
  margin: 10px 0;
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

.actions button.btn-apply {
  background-color: var(--color-edit-primary);
}

.actions button.btn-apply:hover {
  background-color: var(--color-edit-secondary);
}

.actions button.btn-reset {
  background-color: var(--color-gray-200);
}

.actions button.btn-reset:hover {
  background-color: var(--color-gray-300);
}

.actions button.btn-cancel {
  background-color: var(--color-delete-primary);
  margin-left: 5px;
}

.actions button.btn-cancel:hover {
  background-color: var(--color-delete-secondary);
  margin-left: 5px;
}

.form select {
  font: inherit;
}

.select {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
}

.select select {
  padding: 0.35rem;
}

.select > div > button {
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

.select > div > button:hover {
  background-color: var(--color-gray-400);
}

.select ul {
  width: 100%;
}

.calories {
  display: flex;
  justify-content: space-around;
}

.calories > div {
  max-width: 10rem;
  min-width: 5rem;
  display: flex;
  flex-direction: column;
}

.checks {
  background-color: white;
  width: fit-content;
  padding: 1rem;
  border-radius: 10px;
  margin: 10px auto;
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
