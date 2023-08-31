<template>
  <admin-dashboard-nav></admin-dashboard-nav>
  <router-view></router-view>
</template>

<script>
import AdminDashboardNav from '../../components/admin/AdminDashboardNav.vue';

export default {
  components: {
    AdminDashboardNav,
  },
};
</script>
