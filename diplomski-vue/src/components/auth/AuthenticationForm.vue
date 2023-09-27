<template>
  <form @submit.prevent="submitHandler" :class="$style.form">
    <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>

    <p v-if="error" :class="$style.error">{{ error }}</p>

    <p>
      <label htmlFor="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        name="email"
        :maxlength="64"
        required
      />
    </p>
    <p>
      <label htmlFor="password">Password</label>
      <input
        v-model="password"
        id="password"
        type="password"
        name="password"
        :maxLength="32"
        required
      />
    </p>
    <div :class="$style.actions">
      <router-link v-if="isLogin" to="/signup">Create new user</router-link>
      <router-link v-else to="/login">Log in as existing user</router-link>

      <button type="submit">
        {{ isLogin ? 'Log In' : 'Sign Up' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['submitHandler'],
  props: ['isLogin', 'error'],
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style module>
.form {
  max-width: 30rem;
  margin: 2rem auto;
  background-color: white;
  padding: 5px 20px;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.form h1 {
  margin-bottom: 40px;
  font-weight: bold;
}

.error {
  color: var(--color-error-primary);
  background-color: var(--color-error-secondary);
  padding: 4px;
  text-align: center;
  border-radius: 4px;
  border: 1px var(--color-error-primary) solid;
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

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.actions button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  background-color: var(--color-primary-700);
  color: black;
  border: none;
}

.actions a {
  text-decoration: underline;
  padding: 2px 10px;
  border-radius: 10px;
  color: var(--color-gray-600);
}

.actions button:hover {
  background-color: var(--color-primary-400);
}

.actions a:hover {
  text-decoration: none;
  background-color: var(--color-gray-100);
}
</style>
