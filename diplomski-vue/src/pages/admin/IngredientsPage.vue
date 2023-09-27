<template>
  <div :class="$style.container">
    <h2>Ingredients</h2>
    <p v-if="error" :class="$style.error">{{ error }}</p>
    <button
      v-if="!addFormVisible"
      :class="$style['btn-add']"
      @click="showAddForm"
    >
      + Add
    </button>
    <simple-form
      v-if="addFormVisible"
      @submit-handler="addIngredient"
      @close-handler="hideAddForm"
      type="Ingredient"
      method="Add"
    ></simple-form>
    <simple-form
      v-if="editFormVisible"
      @submit-handler="editIngredient"
      @close-handler="hideEditForm"
      type="Ingredient"
      method="Edit"
      :item="ingredientForEdit"
    ></simple-form>

    <simple-list
      v-if="ingredients.length > 0"
      :items="ingredients"
      @edit-handler="updateEditForm"
      @delete-handler="deleteIngredient"
    ></simple-list>
    <p v-else :class="$style['not-found']">No ingredients found.</p>
  </div>
</template>

<script>
import SimpleForm from '../../components/admin/SimpleForm.vue';
import SimpleList from '../../components/admin/SimpleList.vue';

export default {
  components: {
    SimpleForm,
    SimpleList,
  },
  data() {
    return {
      error: null,
      ingredientForEdit: {},
      addFormVisible: false,
      editFormVisible: false,
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
      } catch (e) {
        this.error = e.message;
      }
    },
    async addIngredient(data) {
      this.error = null;
      try {
        await this.$store.dispatch('ingredients/addIngredient', {
          value: data.value,
        });
        this.loadIngredients();
        this.hideAddForm();
      } catch (e) {
        this.error = e.message;
      }
    },
    async editIngredient(data) {
      this.error = null;
      try {
        await this.$store.dispatch('ingredients/editIngredient', {
          id: data.id,
          value: data.value,
        });
        this.loadIngredients();
        this.hideEditForm();
      } catch (e) {
        this.error = e.message;
      }
    },
    updateEditForm(newItem) {
      console.log(newItem);
      this.ingredientForEdit = newItem;
      this.showEditForm();
    },
    async deleteIngredient(data) {
      this.error = null;
      var result = window.confirm('Want to delete?');
      if (result) {
        try {
          await this.$store.dispatch('ingredients/deleteIngredient', {
            id: data.id,
          });
          this.loadIngredients();
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

.not-found {
  align-self: center;
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
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
</style>
