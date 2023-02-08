<template>
  <tr>
    <td>
      {{ item.product.title }}
    </td>
    <td>
      {{ item.product.brand }}
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      <a style="color: red; cursor: pointer" @click="removeFromCart(item)">X</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'FavorItem',
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    updateCart() {
      localStorage.setItem('favor', JSON.stringify(this.$store.state.favor));
    },
    removeFromCart(item) {
      this.$emit('removeFromCart', item);

      this.updateCart();
    },
  },
};
</script>
