import { createStore } from "vuex";
import { fetchAllProducts } from "../services/product.service";

export default createStore({
  state: {
    products: [],
    cart: {},
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setCart(state, payload) {
      state.cart[payload.id] = { ...payload };
      console.log(state.cart);
    },
    setClean(state) {
      state.cart = {};
    },
    increase(state, payload) {
      state.cart[payload].quantity++;
    },
    decrease(state, payload) {
      state.cart[payload].quantity--;
      if (state.cart[payload].quantity === 0) {
        delete state.cart[payload];
      }
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const products = await fetchAllProducts();
        commit("setProducts", products);
      } catch (error) {
        console.log(error);
      }
    },

    addToCart({ commit, state }, product) {
      state.cart.hasOwnProperty(product.id)
        ? (product.quantity = state.cart[product.id].quantity + 1)
        : (product.quantity = 1);
      commit("setCart", product);
    },
  },
  getters: {
    totalQuantity(state) {
      return Object.values(state.cart).reduce(
        (acc, { quantity }) => acc + quantity,
        0
      );
    },
    totalPrice(state) {
      return Object.values(state.cart).reduce(
        (acc, { quantity, price }) => acc + quantity * price,
        0
      );
    },
  },
});
