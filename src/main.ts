import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import store from "./store";

Vue.config.productionTip = false;

const router = createRouter()

const app = new Vue({
  store,
  router,
  components: { App },
  render(h) {
    return h(App)
  },
})

document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('root')
  if (mountPoint) {
    app.$mount(mountPoint)
  }
})