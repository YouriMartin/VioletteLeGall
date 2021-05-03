import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mobile: true,
  },
  mutations: {
    isMobile(state, width) {
      console.log(width);
      if (width <= 768) {
        state.mobile = true;
      } else {
        state.mobile = false;
      }
    },
  },
  actions: {
    getScreenWidth(context, width) {
      context.commit("isMobile", width);
    },
  },
  modules: {},
});
