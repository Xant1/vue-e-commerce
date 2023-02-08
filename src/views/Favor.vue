<template>
  <div>
    <div class="wrapper">
      <h1 class="title">Избранные</h1>
      <hr />
      <br />
      <div class="column_box">
        <table v-if="favorTotalLength">
          <thead>
            <tr>
              <th>Продукт</th>
              <th>Бренд</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <FavorItem
              v-for="item in favor.items"
              :key="item.product.id"
              :initialItem="item"
              @removeFromCart="removeFromCart"
            />
          </tbody>
        </table>

        <p v-else>Ваш список избранных пуст...</p>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import FavorItem from '@/components/FavorItem.vue';

export default {
  name: 'Favor',
  components: {
    FavorItem,
  },
  data() {
    return {
      favor: {
        items: [],
      },
    };
  },
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  mounted() {
    this.favor = this.$store.state.favor;
  },
  methods: {
    removeFromCart(item) {
      this.favor.items = this.favor.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  computed: {
    favorTotalLength() {
      return this.favor.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
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

.summary {
  font-size: 19px;
}
</style>
