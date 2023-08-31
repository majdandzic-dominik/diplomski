<template>
  <shop-nav></shop-nav>
  <router-view></router-view>
</template>

<script>
import ShopNav from '@/components/shop/ShopNav.vue';

export default {
  components: { ShopNav },
};
</script>
