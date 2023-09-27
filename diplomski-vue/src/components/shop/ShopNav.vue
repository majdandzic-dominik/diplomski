<template>
  <header :class="$style.header">
    <h1>Restaurant</h1>
    <div :class="$style.info">
      <router-link to="/shop/cart">Cart: ({{ cart.length }})</router-link>

      <p><strong>Email: </strong>{{ userData.email }}</p>
      <button @click="logoutHandler">Log out</button>

      <p v-if="error">{{ error }}</p>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      userData: 'auth/userData',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    async logoutHandler() {
      this.error = null;
      try {
        await this.logout();
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style module>
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 10px;
}

.info {
  display: flex;
  align-items: center;
}

.info button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.3rem 1.5rem;
  border-radius: 4px;
  background-color: var(--color-gray-300);
  color: black;
  border: none;
  height: auto;
  margin-left: 5px;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.15);
}

.info button:hover {
  background-color: var(--color-gray-400);
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.25);
}

.info * {
  margin-left: 5px;
}

.info a {
  text-decoration: none;
  font-weight: bold;
  background-color: var(--color-primary-600);
  padding: 2px 10px;
  border-radius: 5px;
  color: black;
}

.info a:hover {
  text-decoration: none;
  background-color: var(--color-primary-400);
}

@media (max-width: 680px) {
  .header {
    flex-direction: column-reverse;
    align-items: center;
  }
  .info {
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}
</style>
