<template>
  <div class="home">
    <nav class="topnav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/cart" class="cart">
        <span class="icon"><i class="fas fa-shopping-cart"></i></span>
        <span> Корзина ({{ cartTotalLength }})</span>
      </router-link>
      <router-link to="/favourites" class="favor">
        <span class="icon"><i class="fas fa-star"></i></span>
        <span> Избранные</span>
      </router-link>
    </nav>

    <div class="filter">
      <input
        placeholder="Пойск продукта....."
        v-model="searchQuery"
        type="text"
      />
      <div class="sort_prod">
        <a style="margin-right: 15px" @click="sortLowestPrice"
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
      <HomeItem
        class="prod_box"
        v-for="product in SearchedProducts"
        :product="product"
        :key="product.id"
      />
      <div v-if="!isPostsLoading"></div>
      <h1 v-else>Идет загрузка...</h1>
    </main>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import HomeItem from '@/components/HomeItem';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    HomeItem,
  },

  data() {
    return {
      productsData: [],
      categories: [],
      isPostsLoading: false,
      searchQuery: '',
      activeCategory: '',
      skip: 0,
      limit: 6,
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

    async fetchProducts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://dummyjson.com/products', {
          params: {
            limit: this.limit,
          },
        });
        this.productsData = [...new Set(response.data.products)];
        this.categories = [
          ...new Set(response.data.products.map((x) => x.category)),
        ];
      } catch (e) {
        alert('Ошибка');
      } finally {
        this.isPostsLoading = false;
      }
    },

    async loadMoreProduct() {
      try {
        const response = await axios.get('https://dummyjson.com/products', {
          params: {
            skip: (this.skip += 6),
            limit: this.limit,
          },
        });
        this.productsData = [...this.productsData, ...response.data.products];
      } catch (e) {
        alert('Ошибка');
      }
    },
  },

  mounted() {
    this.fetchProducts();

    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.loadMoreProduct();
        console.log('peresek');
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);

    this.cart = this.$store.state.cart;
  },

  computed: {
    SearchedProducts() {
      return this.productsData.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >
            -1 && item.category.toLowerCase().indexOf(this.activeCategory) > -1
        );
      });
    },
    cartTotalLength() {
      let totalLength = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }

      return totalLength;
    },
  },
  watch: {
    productsData() {
      this.categories = [...new Set(this.productsData.map((x) => x.category))];
    },
  },
};
</script>
<style scoped>
main {
  display: flex;
  width: 85%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 43px;
}

main .prod_box {
  width: 30%;
  margin-bottom: 50px;
  background: #f5f5f5;
  margin-right: 25px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
}

.column {
  float: left;
  padding: 19px;
  margin-bottom: 99px;
}

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
  color: rgb(197, 194, 194);
}

.sort_prod a:hover {
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

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

/* Style the topnav links */
.topnav a {
  float: left;
  color: #f2f2f2;
  padding: 14px 16px;
}

/* Change color on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

a {
  text-decoration: none;
}
</style>
