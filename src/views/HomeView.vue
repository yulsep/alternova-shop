<script>
import ProductCard from "../components/ProductCard.vue";
import Cart from "../components/Cart.vue";
import { onMounted, ref } from "vue";
import { fetchAllProducts } from "../services";
import products from "../mocks/productsMock.json";

export default {
  components: {
    ProductCard,
    Cart,
  },

  setup() {
    const products = ref([]);
    const cartItems = ref([]);

    function updateStock(product, quantity) {
      const productIndex = products.value.findIndex(
        (item) => item.name === product.name
      );
      if (productIndex > -1) {
        products.value[productIndex].stock -= quantity;
      }
    }

    function addToCart(product) {
      console.log(cartItems.value.length);
      const itemIndex = cartItems.value.findIndex(
        (item) => item.name === product.name
      );
      if (itemIndex > -1) {
        cartItems.value[itemIndex].quantity++;
      } else {
        cartItems.value.push({
          id: product.id,
          name: product.name,
          price: product.unit_price,
          quantity: 1,
        });
      }
      updateStock(product, 1);
    }

    function removeFromCart(product) {
      console.log("Este es el producto que voy a eliminar -->", product);
      const itemIndex = cartItems.value.findIndex(
        (item) => item.name === product.name
      );
      if (itemIndex > -1) {
        if (cartItems.value[itemIndex].quantity > 1) {
          cartItems.value[itemIndex].quantity--;
        } else {
          cartItems.value.splice(itemIndex, 1);
        }
      }

      updateStock(product, -1);
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
      updateStock,
    };
  },
};
</script>

<template>
  <cart
    :items="cartItems"
    :update-stock="updateStock"
    @remove-from-cart="removeFromCart"
  />
  <div class="grid__products">
    <product-card
      v-for="product in products"
      :key="product.name"
      :name="product.name"
      :unit_price="product.unit_price"
      :stock="product.stock"
      :id="product.name"
      @add-to-cart="addToCart(product)"
    />
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
