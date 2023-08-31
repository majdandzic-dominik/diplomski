<template>
  <div :class="$style.container">
    <h2>Menu</h2>
    <button
      v-if="!filterVisible"
      @click="showFilter"
      :class="$style['btn-filter']"
    >
      Show Filter
    </button>
    <search-filter-form
      v-if="filterVisible"
      @submit-handler="filterMeals"
      @close-handler="hideFilter"
    ></search-filter-form>
    <div :class="$style['sort-selection']">
      <span>
        <strong>Sort by:</strong>
      </span>
      <select v-model="selectedOption">
        <option v-for="option in sortOptions" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
    <meal-list :meals="filteredMeals" :isAdmin="false"></meal-list>
  </div>
</template>

<script>
import MealList from '@/components/admin/MealList.vue';
import SearchFilterForm from '@/components/shop/SearchFilterForm.vue';
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
} from '@/helpers/compare-functions';
export default {
  components: { MealList, SearchFilterForm },
  data() {
    return {
      sortOptions: [
        'Name[A-Z]',
        'Name[Z-A]',
        'Price[LOW-HIGH]',
        'Price[HIGH-LOW]',
        'Calories[LOW-HIGH]',
        'Calories[HIGH-LOW]',
        'Popularity[LOW-HIGH]',
        'Popularity[HIGH-LOW]',
      ],
      selectedOption: 'Name[A-Z]',
      filteredMeals: [],
      filterVisible: false,
    };
  },
  computed: {
    meals() {
      return this.$store.getters['meals/meals'];
    },
  },
  created() {
    this.loadMeals();
    this.sortMeals();
  },
  watch: {
    filteredMeals() {
      this.sortMeals();
    },
    selectedOption() {
      this.sortMeals();
    },
  },
  methods: {
    async loadMeals() {
      this.error = null;
      try {
        await this.$store.dispatch('meals/loadMeals');
        this.filteredMeals = this.meals;
      } catch (e) {
        this.error = e.message;
      }
    },
    filterMeals(options) {
      this.filteredMeals = [];
      this.meals.forEach((meal) => {
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
          this.filteredMeals.push(meal);
        }
      });
    },
    sortMeals() {
      switch (this.selectedOption) {
        case 'Name[A-Z]':
          this.filteredMeals.sort(compareByNameAscending);
          break;
        case 'Name[Z-A]':
          this.filteredMeals.sort(compareByNameDescending);
          break;
        case 'Price[LOW-HIGH]':
          this.filteredMeals.sort(compareByPriceAscending);
          break;
        case 'Price[HIGH-LOW]':
          this.filteredMeals.sort(compareByPriceDescending);
          break;
        case 'Calories[LOW-HIGH]':
          this.filteredMeals.sort(compareByCaloriesAscending);
          break;
        case 'Calories[HIGH-LOW]':
          this.filteredMeals.sort(compareByCaloriesDescending);
          break;
        case 'Popularity[LOW-HIGH]':
          this.filteredMeals.sort(compareByPopularityAscending);
          break;
        case 'Popularity[HIGH-LOW]':
          this.filteredMeals.sort(compareByPopularityDescending);
          break;
      }
    },
    showFilter() {
      this.filterVisible = true;
    },
    hideFilter() {
      this.filterVisible = false;
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

.btn-filter {
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

.btn-filter:hover {
  background-color: var(--color-primary-400);
}

.sort-selection {
  align-self: flex-end;
  margin: 10px 0;
}

.sort-selection select {
  font: inherit;
  padding: 0.35rem;
}

.notification {
  font-size: 1.5rem;
  font-weight: bold;
  align-self: center;
}
</style>
