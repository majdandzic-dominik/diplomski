<template>
  <header :class="$style.header">
    <div :class="$style['header-basic']">
      <h1>Dashboard</h1>

      <div :class="$style.info">
        <p><strong>Signed in as:</strong> {{ userData.email }}</p>
        <button @click="logoutHandler">Log out</button>
      </div>
      <p v-if="error">{{ error }}</p>
    </div>
    <nav :class="$style.navigation">
      <ul :class="$style.list">
        <li>
          <router-link to="/admin/meals"> Meals </router-link>
        </li>
        <li>
          <router-link to="/admin/categories"> Categories </router-link>
        </li>
        <li>
          <router-link to="/admin/ingredients"> Ingredients </router-link>
        </li>
      </ul>
    </nav>
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
  flex-direction: column;
  margin: 0 auto;
  padding: 0 10px;
}

.header-basic {
  display: flex;
  width: 100%;
  justify-content: space-between;
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

.list {
  display: flex;
  max-width: 40rem;
  margin: 2rem auto;
  justify-content: space-around;
  gap: 1rem;
  list-style-type: none;
}

.list li {
  width: 100%;
  text-align: center;
}

.list a {
  display: inline-block;
  width: 100%;
  text-decoration: none;
  font: inherit;
  font-weight: bold;
  padding: 0.5rem 0rem;
  border-radius: 4px;
  background-color: var(--color-primary-700);
  color: black;
  border: none;
  height: auto;
  margin-left: 5px;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.15);
}

.list a:hover,
.list a.router-link-active {
  background-color: var(--color-primary-400);
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.25);
}

@media (max-width: 560px) {
  .header-basic {
    flex-direction: column-reverse;
    align-items: center;
  }
  .info {
    justify-content: flex-end;
    flex-wrap: wrap;
  }
  .list {
    flex-direction: column;
    max-width: 30rem;
  }
}
</style>
