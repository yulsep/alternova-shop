import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

createApp(App).use(router).use(Vuex).mount("#app");
