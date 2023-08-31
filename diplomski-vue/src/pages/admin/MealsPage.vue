<template>
  <div :class="$style.container">
    <h2>Meals</h2>
    <p v-if="error" :class="$style.error">{{ error }}</p>
    <button
      v-if="!addFormVisible"
      :class="$style['btn-add']"
      @click="showAddForm"
    >
      + Add
    </button>
    <meal-form
      v-if="addFormVisible"
      @submit-handler="addMeal"
      @closeHandler="hideAddForm"
      method="Add"
    ></meal-form>
    <meal-form
      v-if="editFormVisible"
      @submit-handler="editMeal"
      @closeHandler="hideEditForm"
      method="Edit"
      :meal="mealForEdit"
    ></meal-form>
    <meal-list
      @edit-handler="updateEditForm"
      @delete-handler="deleteMeal"
      :meals="meals"
      :isAdmin="true"
    ></meal-list>
  </div>
</template>

<script>
import MealForm from '../../components/admin/MealForm.vue';
import MealList from '../../components/admin/MealList.vue';

export default {
  components: {
    MealForm,
    MealList,
  },
  data() {
    return {
      error: null,
      mealForEdit: {},
      addFormVisible: false,
      editFormVisible: false,
    };
  },
  computed: {
    meals() {
      return this.$store.getters['meals/meals'];
    },
  },
  created() {
    this.loadMeals();
  },
  methods: {
    async loadMeals() {
      this.error = null;
      try {
        await this.$store.dispatch('meals/loadMeals');
      } catch (e) {
        this.error = e.message;
      }
    },
    async addMeal(meal) {
      this.error = null;
      const randOrders = Math.floor(Math.random() * (200 - 50) + 20);
      const randLikes = Math.floor(Math.random() * (50 - 5) + 5);
      try {
        await this.$store.dispatch('meals/addMeal', {
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
          numOfOrders: randOrders,
          numOfLikes: randLikes,
          isAvailable: true,
        });
        this.loadMeals();
        this.hideAddForm();
      } catch (e) {
        this.error = e.message;
      }
    },
    async editMeal(meal) {
      this.error = null;
      try {
        await this.$store.dispatch('meals/editMeal', {
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
        this.loadMeals();
        this.hideAddForm();
      } catch (e) {
        this.error = e.message;
      }
    },
    updateEditForm(newMeal) {
      this.mealForEdit = newMeal;
      this.showEditForm();
    },
    async deleteMeal(meal) {
      this.error = null;
      var result = window.confirm('Want to delete?');
      if (result) {
        try {
          await this.$store.dispatch('meals/deleteMeal', {
            id: meal.id,
          });
          this.loadMeals();
          this.hideAddForm();
          this.hideEditForm();
        } catch (e) {
          this.error = e.message;
        }
      }
    },
    showAddForm() {
      this.addFormVisible = true;
      this.editFormVisible = false;
    },
    hideAddForm() {
      this.addFormVisible = false;
    },
    showEditForm() {
      this.editFormVisible = true;
      this.addFormVisible = false;
    },
    hideEditForm() {
      this.editFormVisible = false;
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
  max-width: 30rem;
  margin: 2rem auto;
  background-color: white;
  padding: 5px 20px;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container h2 {
  align-self: center;
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  border-bottom: 2px var(--color-gray-400) solid;
  padding-bottom: 8px;
}

.btn-add {
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

.btn-add:hover {
  background-color: var(--color-primary-400);
}

.notification {
  font-size: 1.5rem;
  font-weight: bold;
  align-self: center;
}
</style>
