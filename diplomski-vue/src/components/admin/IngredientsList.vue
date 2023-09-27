<template>
  <ul :class="$style.list">
    <li
      v-for="ingredient in ingredients"
      :key="ingredient"
      :class="[
        $style.item,
        type === 'INCLUDE' || type === 'EXCLUDE'
          ? type === 'INCLUDE'
            ? $style.include
            : $style.exclude
          : '',
      ]"
    >
      {{ ingredient }}
      <button @click="removeHandler(ingredient)" type="button">X</button>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['removeHandler'],
  props: ['ingredients', 'type'],
  methods: {
    removeHandler(ingredient) {
      this.$emit('removeHandler', { value: ingredient });
    },
  },
};
</script>

<style module>
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
}

.item {
  margin-right: 10px;
  margin-bottom: 5px;
  background-color: var(--color-gray-200);
  border-radius: 10px;
  padding: 0.2rem 1rem;
}

.item button {
  cursor: pointer;
  margin-left: 5px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: var(--color-gray-100);
}

.item button:hover {
  background-color: white;
}

.include {
  background-color: rgb(173, 253, 173);
}

.exclude {
  background-color: rgb(253, 176, 176);
}
</style>
