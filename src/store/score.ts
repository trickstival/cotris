import { Module } from "vuex";
import { rootState } from ".";

export const scoreState = () => ({
  score: 0,
  goal: 10,
  level: 1,
  seconds: 0
});

export const score: Module<
  ReturnType<typeof scoreState>,
  ReturnType<typeof rootState>
> = {
  namespaced: true,
  state: scoreState,
  mutations: {
    newSecond(state) {
      state.seconds++;
    },
    increaseScore(state, by: number) {
      state.score += by;
    },
    resetScore(state) {
      state.score = 0;
    },
    setGoal(state, goal: number) {
      state.goal = goal;
    }
  },
  actions: {
    nextLevel({ state, commit }) {
      commit("game/restart", null, { root: true });
      state.level++;
    },
    resurrect({ commit, state }) {
      commit("resetScore");
      state.level = 1;
      state.seconds = 0;
    }
  }
};
