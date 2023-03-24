import { createStore } from "vuex";
import { BASE_URL } from "../utils";

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        commit("setProducts", data);
      } catch (err) {
        console.log("Hubo un error en store", err);
      }
    },
  },
  modules: {},
});
