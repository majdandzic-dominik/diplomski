<template>
  <authentication-form
    @submit-handler="register"
    :isLogin="false"
    :error="error"
  ></authentication-form>
</template>

<script>
import AuthenticationForm from '@/components/auth/AuthenticationForm.vue';
import { mapActions } from 'vuex';
export default {
  components: { AuthenticationForm },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    ...mapActions({
      signup: 'auth/signup',
    }),
    async register(userInfo) {
      this.error = null;
      try {
        this.signup({ ...userInfo });
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>
