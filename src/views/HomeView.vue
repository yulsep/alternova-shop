<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchAllProducts } from "../services";
import productCard from "../components/ProductCard.vue";

const products = ref([]);
const route = useRoute();

onMounted(async () => {
  const response = await fetchAllProducts();
  products.value = response;
  console.log(products.value);
});
</script>

<template>
  <div class="grid__products">
    <product-card
      v-for="product in products"
      :key="product.name"
      :product="product"
    />
  </div>
</template>

<style scoped>
.grid__products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 1900px;
  min-width: 300px;
  justify-items: center;
  margin-top: 2rem;
}
</style>
