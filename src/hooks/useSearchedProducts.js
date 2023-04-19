import { ref, computed } from 'vue';

export default function useSearchedProducts(productsData) {
  const searchQuery = ref('');
  const activeCategory = ref('');

  const searchedProducts = computed(() => {
    return productsData.value.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) >
          -1 && item.category.toLowerCase().indexOf(activeCategory.value) > -1
      );
    });
  });

  return {
    searchQuery,
    searchedProducts,
    activeCategory,
  };
}
