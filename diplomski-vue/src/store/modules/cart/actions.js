export default {
  addToCart(context, item) {
    const currentCart = context.state.cart;
    const isItemInCart = context.getters.getItem(item);

    //if item in cart, increase quantity by one, else add new item
    if (isItemInCart) {
      context.commit(
        'setCart',
        currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      context.commit('setCart', [...currentCart, { ...item, quantity: 1 }]);
    }
  },
  removeFromCart(context, item) {
    const currentCart = context.state.cart;
    const isItemInCart = context.getters.getItem(item);

    if (isItemInCart.quantity === 1) {
      context.commit(
        'setCart',
        currentCart.filter((cartItem) => cartItem.id !== item.id)
      );
    } else {
      context.commit(
        'setCart',
        currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  },
  clearCart(context) {
    context.commit('setCart', []);
  },
};
