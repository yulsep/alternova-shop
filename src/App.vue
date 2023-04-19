<!-- <script>
import productCard from "./components/ProductCard.vue";
import Cart from "./components/Cart.vue";

export default {
  name: "App",
  components: {
    productCard,
    Cart,
  },
};
</script>
 -->
<template>
  <main class="main">
    <header class="header__shop">
      <div class="header__shop-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Xbox.svg/2560px-Xbox.svg.png"
          alt="Logo"
          class="header__logo"
        />
        <h2>&#128722;</h2>
      </div>
    </header>
    <router-view></router-view>
  </main>
</template>
