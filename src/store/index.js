import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/store/modules/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: [],
    loggedIn: false,
    id: "",
  },
  mutations: {
    setEmail(state, data) {
      state.userData = data;
    },
    setLoggedIn(state, data) {
      state.loggedIn = data;
    },
    setID(state, data) {
      state.id = data;
    },
  },
  actions: {},
  modules: {
    auth,
  },
});
