import Vue from "vue";
import Vuex from "vuex";
import { game, gameState } from "./game";

Vue.use(Vuex);

interface RootState {
  game: ReturnType<typeof gameState>;
}

export const rootState = () => ({} as RootState);

export default new Vuex.Store({
  state: rootState,
  mutations: {},
  actions: {},
  modules: {
    game
  }
});
