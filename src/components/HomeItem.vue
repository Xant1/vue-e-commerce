<template>
  <main>
    <div>
      <a @click="$router.push(`/product/${product.id}`)">
        <img :src="product.images[0]" alt="" />
        <h1>{{ product.title }}</h1>
        <p>
          Рейтинг: <i class="fas fa-star"></i>
          {{ product.rating }}
        </p>
        <p>
          Цена: <span class="price">$ {{ product.price }}</span>
        </p></a
      >
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomeItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
img {
  width: 100%;
  border-radius: 10px 10px;
  aspect-ratio: 16/12;
}

a {
  cursor: pointer;
}

.price {
  color: grey;
  font-size: 22px;
}
</style>
