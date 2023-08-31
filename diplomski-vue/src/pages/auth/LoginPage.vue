<template>
  <authentication-form
    @submit-handler="loginUser"
    :isLogin="true"
    :error="error"
  ></authentication-form>
</template>

<script>
import AuthenticationForm from '@/components/auth/AuthenticationForm.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { AuthenticationForm },
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
      login: 'auth/login',
    }),
    async loginUser(userInfo) {
      this.error = null;
      try {
        await this.login({ ...userInfo });
        console.log('u login');
        console.log(this.userData);
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>
