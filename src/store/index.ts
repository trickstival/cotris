import Vue from "vue";
import Vuex from "vuex";
import { game, gameState } from "./game";
import { score, scoreState } from "./score";

Vue.use(Vuex);

interface RootState {
  game: ReturnType<typeof gameState>;
  score: ReturnType<typeof scoreState>;
}

export const rootState = () => ({} as RootState);

export default new Vuex.Store({
  state: rootState,
  mutations: {},
  actions: {},
  modules: {
    game,
    score
  }
});
