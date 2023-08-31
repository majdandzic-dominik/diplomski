import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from './pages/admin/AdminDashboard.vue';
import MealsPage from './pages/admin/MealsPage.vue';
import CategoriesPage from './pages/admin/CategoriesPage.vue';
import IngredientsPage from './pages/admin/IngredientsPage.vue';
import UserPage from './pages/shop/UserPage.vue';
import ShopPage from './pages/shop/ShopPage.vue';
import CartPage from './pages/shop/CartPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admin',
      component: AdminDashboard,
      children: [
        { path: 'meals', component: MealsPage },
        { path: 'categories', component: CategoriesPage },
        { path: 'ingredients', component: IngredientsPage },
      ],
    },
    {
      path: '/shop',
      component: UserPage,
      children: [
        { path: '', component: ShopPage },
        { path: 'cart', component: CartPage },
      ],
    },
    { path: '/signup', component: null },
    { path: '/login', component: null },
  ],
});

export default router;
