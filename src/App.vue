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
      <div class="header__buttons">
        <button class="fas fa-shopping-cart">Cart</button>
        <button class="header__register-btn">Register</button>
      </div>
    </header>
    <router-view></router-view>
  </main>
</template>

<style>
.main {
  display: grid;
  width: 100%;
  height: 100%;
}

.header__shop-logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header__logo {
  height: 2vh;
}

.header__shop {
  width: 100%;
  height: 8vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
}

.header__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 2rem;
}

.header__register-btn {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.header__register-btn:hover {
  background-color: #555;
}
</style>
