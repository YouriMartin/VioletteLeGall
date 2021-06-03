import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
//Vue.config.silent = true; //pour enlever les vue warn
Vue.prototype.http = Axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
