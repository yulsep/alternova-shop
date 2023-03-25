<template>
  <div>
    <h1>Shopping Cart</h1>
    <div v-for="product in products" :key="product.name">
      <product-card
        :id="product.name"
        :name="product.name"
        :unit_price="product.unit_price"
        :stock="product.stock"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
      />
    </div>
    <cart :items="cartItems" @remove-from-cart="removeFromCart" />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import { ref, onMounted } from "vue";

export default {
  components: {
    ProductCard,
  },

  setup() {
    const products = ref([]);

    const cartItems = ref([]);

    function addToCart(product) {
      const itemIndex = cartItems.value.findIndex(
        (item) => item.id === product.id
      );
      if (itemIndex > -1) {
        cartItems.value[itemIndex].quantity++;
      } else {
        cartItems.value.push({
          id: product.name,
          name: product.name,
          price: product.unit_price,
          quantity: 1,
        });
      }
    }

    function removeFromCart(productId) {
      const itemIndex = cartItems.value.findIndex(
        (item) => item.id === productId
      );
      if (itemIndex > -1) {
        if (cartItems.value[itemIndex].quantity > 1) {
          cartItems.value[itemIndex].quantity--;
        } else {
          cartItems.value.splice(itemIndex, 1);
        }
      }
    }

    onMounted(async () => {
      const response = await fetchAllProducts();
      products.value = response;
    });

    return {
      products,
      cartItems,
      addToCart,
      removeFromCart,
    };
  },
};
</script>
