import { createApp } from 'vue';
import App from './App.vue';

import router from './router.js';
import store from './store/index.js';
import { auth } from './firebase';

let app;
auth.onAuthStateChanged(async () => {
  if (auth.currentUser) {
    const isNewUser = await store.dispatch('auth/checkIfNewUser');

    if (isNewUser) {
      await store.dispatch('auth/updateOnlineUserData');
    }
    await store.dispatch('auth/updateLocalUserData');

    if (store.getters['auth/userData'].isAdmin) {
      router.push('/admin');
    } else {
      router.push('/shop');
    }
  } else {
    await store.dispatch('auth/clearUserData');
    router.push('/login');
  }
  if (!app) {
    app = createApp(App);

    app.use(router);
    app.use(store);

    app.mount('#app');
  }
});
