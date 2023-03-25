<template>
  <div>
    <h2>Shopping Cart</h2>
    <div v-if="cartItems.length === 0">Your cart is empty</div>
    <div v-else>
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          {{ item.name }} - {{ item.quantity }} -
          {{ item.price * item.quantity }}
          <button @click="removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { addToCart } from "../services";

export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      cartItems: [...this.items],
    };
  },
  methods: {
    addToCart(product) {
      addToCart(this.cartItems, product);
    },
    removeFromCart(productId) {
      const itemIndex = this.cartItems.findIndex(
        (item) => item.id === productId
      );
      if (itemIndex > -1) {
        if (this.cartItems[itemIndex].quantity > 1) {
          this.cartItems[itemIndex].quantity--;
        } else {
          this.cartItems.splice(itemIndex, 1);
        }
      }
    },
  },
  watch: {
    items(newVal) {
      this.cartItems = [...newVal];
    },
  },
};
</script>
