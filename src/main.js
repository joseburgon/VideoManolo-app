import Vue from "vue";
import axios from "axios";
import "@/assets/css/tailwind.css";
import router from "./router/";
import store from "./store";
import App from "./App";

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
