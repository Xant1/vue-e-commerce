<template>
  <div class="page-cart">
    <div class="wrapper">
      <h1 class="title">Корзина</h1>
      <hr />
      <br />
      <div class="column_box">
        <table v-if="cartTotalLength">
          <thead>
            <tr>
              <th>Продукт</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <CartItem
              v-for="item in cart.items"
              :key="item.product.id"
              :initialItem="item"
              @removeFromCart="removeFromCart"
            />
          </tbody>
        </table>

        <p v-else>Ваша корзина пуста...</p>
      </div>
      <br />
      <div class="summary">
        <h2>Общая сумма</h2>
        <br />
        <strong style="color: red">${{ cartTotalPrice.toFixed(2) }}</strong
        >, {{ cartTotalLength }} продуктов

        <hr />
        <br />

        <a href="#">Оформить заказ</a>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';

export default {
  name: 'Cart',
  components: {
    CartItem,
  },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
  },
};
</script>
<style scoped>
a {
  overflow: hidden;
  background-color: #333;
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

a:hover {
  background-color: #2e2c2c;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 19px;
}

table th {
  border: 1px solid #110909;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: rgb(0, 0, 0);
}

.summary{
  font-size: 19px;
}
</style>
