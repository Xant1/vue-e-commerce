<template>
  <div class="home">
    <div class="filter">
      <input
        placeholder="Пойск продукта....."
        v-model="searchQuery"
        type="text"
      />
      <div class="sort_prod">
        <a style="margin-right: 15px" @click="sortLowestPrice">дешевле</a>
        <a style="margin-right: 15px" @click="sortHighestPrice">дороже</a>
        <a @click="sortHighestRating">высокий рейтинг</a>
      </div>
    </div>

    <div class="column side">
      <ul class="left_menu">
        <div class="title_box">Категории</div>
        <li class="category">
          <a href="#" @click="updateActiveCategory">All</a>
        </li>
        <li class="category">
          <a
            v-for="(category, index) in categories"
            :key="index"
            href="#"
            @click="updateActiveCategory"
            >{{ category }}</a
          >
        </li>
      </ul>
    </div>

    <main>
      <HomeItem
        class="prod_box"
        v-for="(product, index) in searchedProducts"
        :product="product"
        :key="index"
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
import { useProducts } from '@/hooks/useProducts';
import useSearchedProducts from '@/hooks/useSearchedProducts';

export default {
  name: 'HomeView',
  components: {
    HomeItem,
  },

  methods: {
    // сортировка по цене
    sortLowestPrice() {
      this.productsData.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
    sortHighestPrice() {
      this.productsData.sort((a, b) => (a.price < b.price ? 1 : -1));
    },
    // сортировка по рейтингу
    sortHighestRating() {
      this.productsData.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    },
    // сортировка по катергории
    updateActiveCategory(e) {
      this.activeCategory = e.target.text == 'All' ? '' : e.target.text;
    },
    // загрузка доп данных для бесконечного скроллинга
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
        console.log('ошибка с загрузкой данных');
      }
    },
  },
  // загрузка данных
  setup(props) {
    const { productsData, isPostsLoading, categories, skip, limit } =
      useProducts();
    const { searchQuery, searchedProducts, activeCategory } =
      useSearchedProducts(productsData);

    return {
      productsData,
      isPostsLoading,
      categories,
      skip,
      limit,
      searchQuery,
      searchedProducts,
      activeCategory,
    };
  },

  mounted() {
    //IntersectionObserver для бесконечного скроллинга
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.loadMoreProduct();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },

  watch: {
    // динамический дополняем категории при поступлении новых данных в productsData
    productsData() {
      this.categories = [...new Set(this.productsData.map((x) => x.category))];
    },
  },
};
</script>
<style scoped>
/* main content */
main {
  display: flex;
  width: 85%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 43px;
}
main .prod_box {
  width: 100%;
  margin-bottom: 50px;
  background: #f5f5f5;
  margin-right: 25px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
}
/* category column */
.column {
  float: left;
}
.column.side {
  width: 15%;
}
.title_box {
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  color: #080808;
}
ul.left_menu {
  width: 196px;
}
ul.left_menu li.category a {
  width: 166px;
  height: 25px;
  background-color: #333;
  text-decoration: none;
  color: #ffffff;
  padding: 0 0 0 30px;
  line-height: 25px;
}
ul.left_menu li.category a:hover {
  color: #ffffff;
  background-color: #5f5c5c;
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

/* search & sort*/
.filter {
  display: flex;
  padding: 15px;
  margin-bottom: 30px;
  justify-content: space-between;
}
.filter input {
  width: 35%;
  float: left;
}
.sort_prod a:hover {
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
/* navigation  */

/* responsive   */
@media only screen and (max-width: 1200px) {
  main {
    width: 70%;
    float: right;
  }
  .filter input {
    width: 50%;
  }
}
@media only screen and (max-width: 1000px) {
  .column.side {
    width: 100%;
  }
  ul.left_menu {
    width: 100%;
  }
  main {
    width: 100%;
  }
  .filter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .filter input {
    width: 100%;
    margin-bottom: 15px;
  }

  .filter .sort_prod {
    display: flex;
    justify-content: center;
  }
}
</style>
