<template>
  <nav class="topnav">
    <router-link to="/">Home</router-link> |
    <router-link to="/cart" class="cart">
      <span class="icon"><i class="fas fa-shopping-cart"></i></span>
      <span> Корзина ({{ cartTotalLength }})</span>
    </router-link>
    <router-link to="/favourites" class="favor">
      <span class="icon"><i class="fas fa-star"></i></span>
      <span> Избранные</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',

  data() {
    return {
      cart: {
        items: [],
      },
      favor: {
        items: [],
      },
    };
  },

  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  mounted() {
    // состаяние корзины из vuex
    this.cart = this.$store.state.cart;
  },

  computed: {
    // счетчик для корзины
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
        this.cart = this.$store.state.cart;
      }
      return totalLength;
    },
  },
};
</script>

<style scoped>
.topnav {
  overflow: hidden;
  background-color: #333;
}
.topnav .cart {
  float: right;
}
.topnav .favor {
  float: right;
}
.topnav a {
  float: left;
  color: #f2f2f2;
  padding: 14px 16px;
}
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
a {
  text-decoration: none;
}
</style>
