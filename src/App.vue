<script>
import { reactive } from "vue";
import productCard from "./components/ProductCard.vue";
import Cart from "./components/Cart.vue";

export default {
  name: "App",
  components: {
    productCard,
    Cart,
  },

  setup() {
    const CartState = reactive({
      isCartHidden: true,
    });

    const toggleCart = () => {
      CartState.isCartHidden = !CartState.isCartHidden;
      const cartContainer = document.querySelector(".container-cart-products");
      if (CartState.isCartHidden) {
        cartContainer.classList.add("hidden-cart");
      } else {
        cartContainer.classList.remove("hidden-cart");
      }
    };

    return {
      toggleCart,
      isCartHidden: CartState.isCartHidden,
    };
  },
};
</script>

<template>
  <main class="main">
    <header class="header__shop">
      <div class="header__shop-logo">
        <img
          src="https://www.alternova.co/wp-content/uploads/2021/03/cropped-logo-Alternova.png"
          alt="Alternova Logo"
          class="header__logo"
        />
        <h2>&#128722;</h2>
      </div>
      <div class="container-icon">
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
          <span id="contador-productos">0</span>
        </div>

        <div
          class="hidden-cart"
          :class="{ 'container-cart-products': isCartHidden }"
        >
          <div class="row-product">
            <div class="cart-product">
              <div class="info-cart-product">
                <span class="amount__product-cart">1</span>
                <p class="title__product-cart">Papitas de limon Margarita</p>
                <span class="unit_price_cart">$2000</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div class="cart-total">
            <h3>Total:</h3>
            <span class="total__topay">$2000</span>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </main>
</template>
