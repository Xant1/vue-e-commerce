import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

export function useProducts() {
  const productsData = ref([]);
  const isPostsLoading = ref(false);
  const categories = ref([]);
  const skip = ref(0);
  const limit = ref(8);

  const fetching = async () => {
    try {
      isPostsLoading.value = true;
      const response = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: limit.value,
        },
      });
      productsData.value = [...new Set(response.data.products)];
      categories.value = [
        ...new Set(response.data.products.map((x) => x.category)),
      ];
    } catch (e) {
      console.log('ошибка с загрузкой данных');
    } finally {
      isPostsLoading.value = false;
    }
  };

  const loadMoreProduct = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: {
          skip: (skip.value += 6),
          limit: limit.value,
        },
      });
      productsData.value = [...productsData.value, ...response.data.products];
    } catch (e) {
      console.log('ошибка с загрузкой данных');
    }
  };

  watch(productsData, (newValue, oldValue) => {
    categories.value = [...new Set(productsData.value.map((x) => x.category))];
  });

  onMounted(fetching);

  return {
    productsData,
    isPostsLoading,
    categories,
    skip,
    limit,
    loadMoreProduct
  };
}
