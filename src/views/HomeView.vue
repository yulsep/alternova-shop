<script>
import ProductCard from "../components/ProductCard.vue";
import Cart from "../components/Cart.vue";
import { onMounted, ref } from "vue";
import { fetchAllProducts } from "../services";
import { addToCart } from "../services";

export default {
  components: {
    ProductCard,
    Cart,
  },

  setup() {
    const products = ref([]);
    const cartItems = ref([]);

    function addToCart(product) {
      console.log(product);
      console.log(this.cartItems);
      const itemIndex = this.cartItems.findIndex(
        (item) => item.name === product.name
      );
      if (itemIndex > -1) {
        this.cartItems[itemIndex].quantity++;
      } else {
        this.cartItems.push({
          id: product.id,
          name: product.name,
          price: product.unit_price,
          quantity: 1,
        });
      }
      updateStock(product, 1);
    }

    function removeFromCart(product) {
      const itemIndex = this.cartItems.findIndex(
        (item) => item.name === product.name
      );
      if (itemIndex > -1) {
        if (this.cartItems[itemIndex].quantity > 1) {
          this.cartItems[itemIndex].quantity--;
        } else {
          this.cartItems.splice(itemIndex, 1);
        }
      }

      updateStock(product, -1);
    }

    function updateStock(product, quantity) {
      const productIndex = products.value.findIndex(
        (item) => item.name === product.name
      );
      if (productIndex > -1) {
        products.value[productIndex].stock -= quantity;
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
      updateStock,
    };
  },
};
</script>

<template>
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
    <cart :items="cartItems" @remove-from-cart="removeFromCart" />
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
