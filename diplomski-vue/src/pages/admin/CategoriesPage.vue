<template>
  <div :class="$style.container">
    <h2>Categories</h2>
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
      @submit-handler="addCategory"
      @close-handler="hideAddForm"
      type="Category"
      method="Add"
    ></simple-form>
    <simple-form
      v-if="editFormVisible"
      @submit-handler="editCategory"
      @close-handler="hideEditForm"
      type="Category"
      method="Edit"
      :item="categoryForEdit"
    ></simple-form>
    <simple-list
      v-if="categories"
      :items="categories"
      @edit-handler="updateEditForm"
      @delete-handler="deleteCategory"
    ></simple-list>
    <p v-else>No ingredients found.</p>
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
      categoryForEdit: {},
      addFormVisible: false,
      editFormVisible: false,
    };
  },
  computed: {
    categories() {
      return this.$store.getters['categories/categories'];
    },
  },
  created() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      this.error = null;
      try {
        await this.$store.dispatch('categories/loadCategories');
      } catch (e) {
        this.error = e.message;
      }
    },
    async addCategory(data) {
      this.error = null;
      try {
        await this.$store.dispatch('categories/addCategory', {
          value: data.value,
        });
        this.loadCategories();
        this.hideAddForm();
      } catch (e) {
        this.error = e.message;
      }
    },
    async editCategory(data) {
      this.error = null;
      try {
        await this.$store.dispatch('categories/editCategory', {
          id: data.id,
          value: data.value,
        });
        this.loadCategories();
        this.hideEditForm();
      } catch (e) {
        this.error = e.message;
      }
    },
    updateEditForm(newItem) {
      this.categoryForEdit = newItem;
      this.showEditForm();
    },
    async deleteCategory(data) {
      this.error = null;
      var result = window.confirm('Want to delete?');
      if (result) {
        try {
          await this.$store.dispatch('categories/deleteCategory', {
            id: data.id,
          });
          this.loadCategories();
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
</style>
