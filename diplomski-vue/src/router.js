import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from './pages/admin/AdminDashboard.vue';
import MealsPage from './pages/admin/MealsPage.vue';
import CategoriesPage from './pages/admin/CategoriesPage.vue';
import IngredientsPage from './pages/admin/IngredientsPage.vue';
import UserPage from './pages/shop/UserPage.vue';
import ShopPage from './pages/shop/ShopPage.vue';
import CartPage from './pages/shop/CartPage.vue';
import LoginPage from './pages/auth/LoginPage.vue';
import SignUpPage from './pages/auth/SignUpPage.vue';
import { auth } from './firebase';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/admin',
      component: AdminDashboard,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'meals',
          component: MealsPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'categories',
          component: CategoriesPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'ingredients',
          component: IngredientsPage,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/shop',
      component: UserPage,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          component: ShopPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'cart',
          component: CartPage,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/signup',
      component: SignUpPage,
      meta: {
        noUser: true,
      },
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        noUser: true,
      },
    },
  ],
});

router.beforeEach(function (to, from, next) {
  const currentUser = auth.currentUser;
  const requiresAuth = to.meta.requiresAuth;
  const isAdmin = store.getters['auth/userData'].isAdmin;
  console.log(to);
  if (
    to.fullPath != '/admin' &&
    to.fullPath != '/admin/meals' &&
    to.fullPath != '/admin/ingredients' &&
    to.fullPath != '/admin/categories' &&
    requiresAuth &&
    currentUser &&
    isAdmin
  ) {
    next('/admin');
  } else if (
    to.fullPath != '/shop' &&
    to.fullPath != '/shop/cart' &&
    requiresAuth &&
    currentUser &&
    !isAdmin
  ) {
    next('/shop');
  } else if (to.fullPath != '/login' && requiresAuth && !currentUser) {
    next('/login');
  } else if (to.meta.noUser && currentUser) {
    if (isAdmin) {
      next('/admin');
    } else {
      next('/shop');
    }
  } else {
    next();
  }
});

export default router;
