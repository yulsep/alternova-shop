<script>
import { watch, ref } from "vue";

export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
    updateStock: {
      type: Function,
      required: true,
    },
  },

  setup(props, ctx) {
    const cartItems = ref([]);
    const cartVisible = ref(false);

    function removeFromCart(product) {
      ctx.emit("remove-from-cart", {
        name: product.name,
        unit_price: product.unit_price,
        stock: product.stock,
      });
    }

    function getTotal() {
      return cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }

    function getCartItemCount() {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    }

    function placeOrder() {
      const orderDetails = {
        products: [],
        totalPrice: 0,
      };

      cartItems.forEach((item) => {
        const product = {
          name: props.name,
          quantity: props.quantity,
          price: props.price,
          total: props.quantity * item.price,
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
    }

    watch(
      props.items,
      (newVal) => {
        cartItems.value = [...newVal];
      },
      { deep: true }
    );

    return {
      cartItems,
      cartVisible,
      removeFromCart,
      getTotal,
      getCartItemCount,
      placeOrder,
    };
  },
};
</script>

<template>
  <div>
    <button @click="cartVisible = !cartVisible" class="container-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-cart"
        @click="toggleCart"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      <div class="count-products">
        <span id="contador-productos">{{ getCartItemCount() }}</span>
      </div>
    </button>
    <div v-if="cartVisible">
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
                    <button
                      class="button__remove"
                      @click="removeFromCart(item)"
                    >
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="cartItems.length > 0">
              <h4>Total: ${{ getTotal() }}</h4>
              <button class="cart-total" @click="placeOrder">
                Place Order
              </button>
            </div>
          </div>
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
}
</style>
