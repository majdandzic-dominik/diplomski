<template>
  <div :class="$style.container">
    <h3>{{ method }}</h3>
    <form :class="$style.form" @submit.prevent="submitHandler">
      <label :for="type">{{ type }} name: </label>
      <input type="text" :id="type" required v-model="value" />
      <div :class="$style.actions">
        <button :class="$style['btn-save']" type="submit">Save</button>
        <button
          @click="closeHandler"
          :class="$style['btn-cancel']"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['submitHandler', 'closeHandler'],
  props: ['type', 'method', 'item'],
  data() {
    return { value: '' };
  },
  created() {
    if (this.item) {
      this.value = this.item.value;
    }
  },
  computed: {
    id() {
      if (this.item) {
        return this.item.id;
      } else {
        return '';
      }
    },
  },
  methods: {
    submitHandler() {
      if (this.value.trim() != '') {
        this.$emit('submitHandler', { id: this.id, value: this.value });
      }
    },
    closeHandler() {
      this.$emit('closeHandler');
    },
  },
  watch: {
    item(newItem) {
      this.value = newItem.value;
    },
  },
};
</script>

<style module>
.container {
  width: 100%;
  background-color: #fcf3e1;
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

.form label,
.form input {
  display: block;
  width: 100%;
}

.form label {
  font-weight: bold;
}

.form input {
  font: inherit;
  padding: 0.25rem;
}
</style>
