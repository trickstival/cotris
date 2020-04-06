import Vue from "vue";
import Vuex from "vuex";
import { game, gameState } from "./game";
import { score, scoreState } from "./score";
import { auth, authState } from "./auth";
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

interface RootState {
  game: ReturnType<typeof gameState>;
  score: ReturnType<typeof scoreState>;
  auth: ReturnType<typeof authState>;
}

export const rootState = () => ({} as RootState);

export default new Vuex.Store({
  state: rootState,
  mutations: {
    ...vuexfireMutations
  },
  actions: {},
  modules: {
    game,
    score,
    auth
  }
});
