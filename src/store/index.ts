import Vue from "vue";
import Vuex from "vuex";
import { game } from "./game";

Vue.use(Vuex);

export const rootState = () => ({});

export default new Vuex.Store({
  state: rootState,
  mutations: {},
  actions: {},
  modules: {
    game
  }
});
