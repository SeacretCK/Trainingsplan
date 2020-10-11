import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import Toasted from "vue-toasted";
Vue.use(Toasted);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
