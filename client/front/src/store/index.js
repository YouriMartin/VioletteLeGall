import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mobile: true,
    message: "Votre message",
    admin: false,
  },
  mutations: {
    isMobile(state, width) {
      if (width <= 768) {
        state.mobile = true;
      } else {
        state.mobile = false;
      }
    },
    setMessage(state, message) {
      state.message = message;
    },
    isConnected(state) {
      state.admin = true;
    },
  },
  actions: {
    getScreenWidth(context, width) {
      context.commit("isMobile", width);
    },
    getMessage(context, message) {
      context.commit("setMessage", message);
    },
  },
  modules: {},
});
