import { Module } from "vuex";
import { rootState } from ".";
import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase.plugin'

export const scoreState = () => ({
  score: 0,
  goal: 10,
  level: 1,
  seconds: 0,
  highscores: []
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
    },
  },
  actions: {
    nextLevel({ state, commit }) {
      commit("game/restart", null, { root: true });
      state.level++;
    },
    sendScore({ rootState, state }) {
      const { currentUser } = rootState.auth
      debugger
      if (!currentUser) {
        return
      }

      db.collection('scores').doc(currentUser.uid).set({
        name: currentUser.displayName || currentUser.uid,
        score: state.score
      })
    },
    resurrect({ commit, state }) {
      commit("resetScore");
      state.level = 1;
      state.seconds = 0;
    },
    bindHighscoresRef: firestoreAction(context => {
      return context.bindFirestoreRef('highscores', db.collection('scores').orderBy('score').limitToLast(5))
    })
  }
};
