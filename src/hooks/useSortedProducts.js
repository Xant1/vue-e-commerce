export default function useSortedProducts(productsData, activeCategory) {
  // сортировка по цене
  function sortLowestPrice() {
    return productsData.value.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
  function sortHighestPrice() {
    return productsData.value.sort((a, b) => (a.price < b.price ? 1 : -1));
  }
  // сортировка по рейтингу
  function sortHighestRating() {
    return productsData.value.sort((a, b) => (a.rating < b.rating ? 1 : -1));
  }
  // сортировка по катергории
  function updateActiveCategory(e) {
    return (activeCategory.value = e.target.text == 'All' ? '' : e.target.text);
  }

  return {
    sortLowestPrice,
    sortHighestPrice,
    sortHighestRating,
    updateActiveCategory,
  };
}
