<template>
  <div :class="$style.container">
    <h2>Cart</h2>
    <p v-if="error" :class="$style.error">{{ error }}</p>
    <div :class="$style.actions">
      <router-link to="/shop">Back</router-link>
      <button @click="clearCart" :class="$style['btn-reset']">
        Clear cart
      </button>
    </div>

    <div v-if="cart.length > 0" :class="$style.items">
      <div v-for="item in cart" :key="item.name" :class="$style.item">
        <div :class="$style.info">
          <h3>{{ item.name }}</h3>
          <p>(${{ item.price }})</p>
        </div>
        <div :class="$style['cart-controls']">
          <button @click="removeFromCart(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="addToCart(item)">+</button>
        </div>
      </div>
    </div>

    <div v-else :class="$style.items">
      <h3 :class="$style.item">Cart is empty</h3>
    </div>

    <div :class="$style.price"><strong>Total: </strong>${{ cartTotal }}</div>
    <div :class="$style.apply">
      <button @click="submitHandler" :class="$style['btn-apply']">Order</button>
    </div>
  </div>
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
      cartTotal: 'cart/cartTotal',
      getItem: 'cart/getItem',
    }),
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart',
      clearCart: 'cart/clearCart',
    }),
    submitHandler() {
      if (this.cart.length <= 0) {
        this.error = 'Please add items to cart';
      } else {
        var result = window.confirm('Are you sure you want to order?');
        if (result) {
          this.cart.forEach((item) => {
            let validItem = { ...item };
            delete validItem.quantity;
            const newItem = {
              ...validItem,
              numOfOrders: validItem.numOfOrders + item.quantity,
            };
            this.updateMealOrders(newItem);
          });
          this.clearCart();
          this.$router.push('/shop');
        }
      }
    },
    async updateMealOrders(meal) {
      this.error = null;
     
      try {
        await this.$store.dispatch('meals/updateMealOrders', {
          ...meal,
        });
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style module>
.error {
  width: 100%;
  color: var(--color-error-primary);
  background-color: var(--color-error-secondary);
  padding: 4px;
  text-align: center;
  border-radius: 4px;
  border: 1px var(--color-error-primary) solid;
}

.container {
  max-width: 30rem;
  margin: 2rem auto;
  background-color: white;
  padding: 5px 20px;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container h2 {
  align-self: center;
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  border-bottom: 2px var(--color-gray-400) solid;
  padding-bottom: 8px;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
}

.actions button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.1rem 1rem;
  border-radius: 4px;
  color: black;
  border: none;
  height: auto;
}

.actions a {
  text-decoration: underline;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 10px;
  color: var(--color-error-primary);
}

.actions a:hover {
  text-decoration: none;
  background-color: var(--color-error-secondary);
}

.actions button.btn-reset {
  background-color: var(--color-primary-700);
}

.actions button.btn-reset:hover {
  background-color: var(--color-primary-400);
}

.apply {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
}

.apply button.btn-apply {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.1rem 1rem;
  border-radius: 4px;
  color: black;
  border: none;
  height: auto;
  background-color: var(--color-edit-primary);
}

.apply button.btn-apply:hover {
  background-color: var(--color-edit-secondary);
}

.price {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 10px 0 0 0;
}

.items {
  width: 100%;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: var(--color-primary-300);
  margin-bottom: 10px;
  padding: 1rem;
  border-radius: 5px;
  border: 2px var(--color-primary-600) solid;
}

.info h3,
.info p {
  font-size: 1.2rem;
  margin: 0;
}

.cart-controls button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.2rem 1rem;
  border-radius: 4px;
  background-color: var(--color-gray-300);
  color: black;
  border: none;
}

.cart-controls button:hover {
  background-color: var(--color-gray-400);
}

.cart-controls span {
  font-weight: bold;
  background-color: white;
  padding: 0.2rem 0.5rem;
  margin: 0 5px;
}
</style>
