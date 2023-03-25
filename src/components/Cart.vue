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
    addShoppingCart() {
      addToCart(this.cartItems, product);
    },
    /* addToCart(product) {
      addToCart(this.cartItems, product);
    }, */
    removeFromCart(product) {
      console.log(product);
      const itemIndex = this.cartItems.findIndex((item) => item.id === product);
      if (itemIndex > -1) {
        if (this.cartItems[itemIndex].quantity > 1) {
          this.cartItems[itemIndex].quantity--;
        } else {
          this.cartItems.splice(itemIndex, 1);
        }
      }
    },
    getTotal() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    placeOrder() {
      console.log("Order Placed");
      const orderDetails = {
        products: [],
        totalPrice: 0,
      };

      this.cartItems.forEach((item) => {
        const product = {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
        };
        orderDetails.products.push(product);
        orderDetails.totalPrice += product.total;
      });

      const orderJson = JSON.stringify(orderDetails);

      const orderUrl = URL.createObjectURL(
        new Blob([orderJson], { type: "application/json" })
      );

      const downloadLink = document.createElement("a");
      downloadLink.href = orderUrl;
      downloadLink.download = "order.json";
      downloadLink.click();
    },
  },

  watch: {
    items(newVal) {
      this.cartItems = [...newVal];
    },
  },
};
</script>

<template>
  <div class="container">
    <h2>Shopping Cart</h2>
    <div class="table__container">
      <div v-if="cartItems.length === 0">Your cart is empty</div>
      <div v-else>
        <table>
          <thead>
            <tr style="justify-content: left">
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartItems" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ item.price * item.quantity }}</td>
              <td>
                <button class="button__remove" @click="removeFromCart(item.id)">
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="cartItems.length > 0">
          <h4>Total: ${{ getTotal() }}</h4>
          <button class="cart-total" @click="placeOrder">Place Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table__container {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  justify-self: left;
}

.button__remove {
  background-color: #f4367c;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

th {
  background: #d1d1d1;
  display: table-cell;
  vertical-align: inherit;
  font-weight: bold;
  text-align: left;
}

h4 {
  display: flex;
  justify-content: end;
}
</style>
