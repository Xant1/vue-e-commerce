import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: {
      items: [],
    },
    favor: {
      items: [],
    },
  },
  getters: {},
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'));
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }

      if (localStorage.getItem('favor')) {
        state.favor = JSON.parse(localStorage.getItem('favor'));
      } else {
        localStorage.setItem('favor', JSON.stringify(state.favor));
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    addToFavor(state, item) {
      const exists = state.favor.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.favor.items.push(item);
      }

      localStorage.setItem('favor', JSON.stringify(state.favor));
    },
    clearFavor(state) {
      state.favor = { items: [] };

      localStorage.setItem('favor', JSON.stringify(state.favor));
    },
    clearCart(state) {
      state.cart = { items: [] };

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    CLEAR_CART_ITEMS(state) {
      state.cart = { items: [] };

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {
    clearCartItems({ commit }) {
      commit('CLEAR_CART_ITEMS');
    },
  },
  modules: {},
});
