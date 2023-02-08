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
      <a style="color: red; cursor: pointer" @click="removeFromFavor(item)">X</a>
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
    updateFavor() {
      localStorage.setItem('favor', JSON.stringify(this.$store.state.favor));
    },
    removeFromFavor(item) {
      this.$emit('removeFromFavor', item);

      this.updateFavor();
    },
  },
};
</script>
