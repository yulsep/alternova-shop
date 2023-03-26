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
    </header>
    <router-view></router-view>
  </main>
</template>
