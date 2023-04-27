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
        <p>{{ product.brand }}</p>
        <h1>{{ product.title }}</h1>
        <h4>$ {{ product.price }}</h4>
        <input type="number" class="input" min="1" v-model="quantity" />
        <a class="btn" @click="addToCart()">В корзину</a>
        <a class="btn" @click="addToFavor()">В избранное</a>
        <h3>Информация</h3>
        <br />
        <p>{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      product: [],
      quantity: 1,
      image: [],
    };
  },

  methods: {
    //функция чтобы поменять выбранную картинку на другую
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
    // добавить продукт в корзину
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }

      const item = {
        product: this.product,
        quantity: this.quantity,
      };

      this.$store.commit('addToCart', item);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'корзина для покупок',
        text: 'продукт успешно добавлен в корзину',
        showConfirmButton: false,
        timer: 2500,
      });
    },
    // добавить продукт в избранные
    addToFavor() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }

      const item = {
        product: this.product,
        quantity: this.quantity,
      };

      this.$store.commit('addToFavor', item);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'избранные',
        text: 'продукт успешно добавлен в избранные',
        showConfirmButton: false,
        timer: 2500,
      });
    },
  },

  mounted() {
    // загрузка конкретного продукта по id
    const api = 'https://dummyjson.com/products/' + this.$route.params.id;
    axios.get(api).then((response) => {
      this.product = response.data;
      this.image = this.product.images;
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
  flex-basis: 45%;
  min-width: 300px;
  margin-left: 5%;
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

.single-product input {
  width: 50px;
  height: 40px;
  padding-left: 10px;
  font-size: 20px;
  margin-right: 10px;
  border: 1px solid #ff523b;
}

input:focus {
  outline: none;
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
