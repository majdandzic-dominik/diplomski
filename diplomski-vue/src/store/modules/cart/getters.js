export default {
  cart(state) {
    return state.cart;
  },
  cartTotal(state) {
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  getItem: (state) => (item) => {
    return state.cart.find((cartItem) => cartItem.id === item.id);
  },
};
