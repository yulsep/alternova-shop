<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchAllProducts } from "../services";
import productCard from "../components/ProductCard.vue";
import Cart from "../components/Cart.vue";

const products = ref([]);
const route = useRoute();

onMounted(async () => {
  const response = await fetchAllProducts();
  products.value = response;
});
</script>

<template>
  <div class="grid__products">
    <product-card
      v-for="(product, index) in products"
      :key="index"
      :name="product.name"
      :unit_price="product.unit_price"
      :stock="product.stock"
      :id="product.name"
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
    />
    <cart />
  </div>
</template>

<style scoped>
.grid__products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 1900px;
  min-width: 300px;
  justify-items: center;
  margin-top: 2rem;
}
</style>
