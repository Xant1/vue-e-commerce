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
      <div v-intersection="loadMoreProduct" class="observer"></div>
    </main>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import HomeItem from '@/components/HomeItem';
import { useProducts } from '@/hooks/useProducts';
import useSearchedProducts from '@/hooks/useSearchedProducts';
import useSortedProducts from '@/hooks/useSortedProducts';

export default {
  name: 'HomeView',
  components: {
    HomeItem,
  },

  setup(props) {
    const {
      productsData,
      isPostsLoading,
      categories,
      skip,
      limit,
      loadMoreProduct,
    } = useProducts();
    const { searchQuery, searchedProducts, activeCategory } =
      useSearchedProducts(productsData);
    const {
      sortLowestPrice,
      sortHighestPrice,
      sortHighestRating,
      updateActiveCategory,
    } = useSortedProducts(productsData, activeCategory);

    return {
      productsData,
      isPostsLoading,
      categories,
      skip,
      limit,
      loadMoreProduct,
      searchQuery,
      searchedProducts,
      activeCategory,
      sortLowestPrice,
      sortHighestPrice,
      sortHighestRating,
      updateActiveCategory,
    };
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
