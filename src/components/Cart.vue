<template>
  <div>
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item.name }} - {{ item.quantity }} - {{ item.price * item.quantity }}
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
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
      const itemIndex = this.cartItems.findIndex(
        (item) => item.id === product.id
      );
      console.log(item.id);
      console.log(product.id);
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
