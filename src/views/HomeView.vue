<template>
  <div class="home">
    
      <div class="filter">
        <input
          placeholder="Пойск продукта....."
          v-model="searchQuery"
          type="text"
        />
        <div class="sort_prod">
          <a  style="margin-right: 15px" @click="sortLowestPrice"
            >сначала дешевле</a
          >
          <a style="margin-right: 15px" @click="sortHighestPrice"
            >сначала дороже</a
          >
          <a @click="sortHighestRating">высокий рейтинг</a>
        </div>
      </div>
    
    <div class="column side">
      <label>Категории</label> <br />
      <br />
      <div class="category">
        <a href="#" @click="updateActiveCategory">All</a>
        <a
          v-for="(category, index) in categories"
          :key="index"
          href="#"
          @click="updateActiveCategory"
          >{{ category }}</a
        >
      </div>
    </div>

    <main>
      <HelloWorld
        class="prod_box"
        v-for="product in sortedAndSearchedProducts"
        :product="product"
        :key="product.id"
      />
    </main>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';

export default {
  data() {
    return {
      productsData: [],
      categories: [],
      searchQuery: '',
      activeCategory: '',
    };
  },

  mounted() {
    const api = 'https://dummyjson.com/products';
    axios.get(api).then((response) => {
      this.categories = [
        ...new Set(response.data.products.map((x) => x.category)),
      ];
      this.productsData = response.data.products;
    });
  },

  methods: {
    sortLowestPrice() {
      this.productsData.sort((a, b) => (a.price > b.price ? 1 : -1));
    },

    sortHighestPrice() {
      this.productsData.sort((a, b) => (a.price < b.price ? 1 : -1));
    },

    sortHighestRating() {
      this.productsData.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    },

    updateActiveCategory(e) {
      this.activeCategory = e.target.text == 'All' ? '' : e.target.text;
    },
  },

  computed: {
    sortedAndSearchedProducts() {
      return this.productsData.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >
            -1 && item.category.toLowerCase().indexOf(this.activeCategory) > -1
        );
      });
    },
  },

  name: 'HomeView',
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
main {
  display: flex;
  width: 85%;
  flex-wrap: wrap;
  justify-content: center;
}

main .prod_box {
  width: 30%;
  margin-bottom: 50px;
  background: #f5f5f5;
  border-radius: 10px 10px;
  padding: 5px;
  margin-right: 25px;
  text-align: center;
}

.column {
  float: left;
  padding: 19px;
  margin-bottom: 99px;
}

/* Left and right column */
.column.side {
  width: 11%;
}

.filter {
  display: flex;
  padding: 15px;
  margin-bottom: 30px;
  justify-content: space-between;
}

.filter input {
  width: 25%;
  float: left;
}

.category {
  overflow: hidden;
  background-color: #333;
}

.category a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
.category a:hover {
  background-color: #ddd;
  color: black;
  
}

.sort_prod a:hover{
 background-color: #333;
 color: #fff;
 cursor: pointer;
}
</style>
