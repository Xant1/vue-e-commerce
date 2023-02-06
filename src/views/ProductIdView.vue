<template>
  <div class="small-container single-product">
    <div class="row">
      <div class="col-2">
        <img :src="image[0]" id="ProductImg" />

        <div class="small-img-row">
          <div class="small-img-col">
            <img @click="changeImg" :src="image[0]" class="small-img" />
          </div>
          <div class="small-img-col">
            <img @click="changeImg" :src="image[1]" class="small-img" />
          </div>
          <div class="small-img-col">
            <img @click="changeImg" :src="image[2]" class="small-img" />
          </div>
          <div class="small-img-col">
            <img @click="changeImg" :src="image[3]" class="small-img" />
          </div>
        </div>
      </div>
      <div class="col-2">
        <p>{{ productData.brand }}</p>
        <h1>{{ productData.title }}</h1>
        <h4>{{ productData.price }}</h4>
        <a class="btn">В корзину</a>
        <a class="btn">В избранное</a>
        <h3>Информация</h3>
        <br />
        <p>{{ productData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      productData: [],
      image: [],
    };
  },

  methods: {
    changeImg() {
      let ProductImg = document.getElementById('ProductImg');
      let SmallImg = document.getElementsByClassName('small-img');

      SmallImg[0].onclick = function () {
        ProductImg.src = SmallImg[0].src;
      };

      SmallImg[1].onclick = function () {
        ProductImg.src = SmallImg[1].src;
      };
      SmallImg[2].onclick = function () {
        ProductImg.src = SmallImg[2].src;
      };
      SmallImg[3].onclick = function () {
        ProductImg.src = SmallImg[3].src;
      };
    },
  },

  mounted() {
    const api = 'https://dummyjson.com/products/' + this.$route.params.id;
    axios.get(api).then((response) => {
      this.productData = response.data;
      this.image = this.productData.images;
    });
  },
};
</script>

<style>
.small-container {
  max-width: 1080px;
  margin: auto;
  padding-left: 25px;
  padding-right: 25px;
}

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}

.col-2 {
  flex-basis: 50%;
  min-width: 300px;
}

.col-2 img {
  max-width: 100%;
  padding: 50px 0;
  max-height: 375px;
}

.col-2 h1 {
  font-size: 50px;
  line-height: 60px;
  margin: 25px 0;
}

.btn {
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  margin: 30px 0;
  border-radius: 30px;
  transition: background 0.5s;
  cursor: pointer;
  margin-right: 5px;
}

.btn:hover {
  background: #704242;
}

.single-product {
  margin-top: 80px;
}

.single-product col-2 img {
  padding: 0;
}

.single-product col-2 {
  padding: 20px;
}

.single-product h4 {
  margin: 20px 0;
  font-size: 22px;
  font-weight: bold;
}

.small-img-row {
  display: flex;
  justify-content: space-between;
}

.small-img-col {
  flex-basis: 24%;
  cursor: pointer;
}
</style>
