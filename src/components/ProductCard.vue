<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="product-card">
    <img
      src="https://via.placeholder.com/150"
      alt="Product image"
      class="product-image"
    />
    <h2 class="product-name">name: {{ name }}</h2>
    <p class="product-quantity">Desired quantity</p>
    <span class="product-price">price: {{ unit_price }}</span>
    <button class="add-to-cart-btn">Add to Cart</button>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 270px;
  padding: 1rem;
  margin: 1rem;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-quantity {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: #555;
}
</style>

<script>
export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
  },
};
</script>
