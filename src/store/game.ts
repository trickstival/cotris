import { Module } from "vuex";
import { rootState } from ".";
import { Tetramino } from '@/engine/entities/Tetramino';

const gameState = () => ({
  score: 0,
  level: 0,
  currentGoal: 0,
  currentXSelection: 3,
  currentYSelection: 0,
  currentTetramino: Tetramino.getRandomTetramino(),
  nextTetramino: Tetramino.getRandomTetramino()
});

export const game: Module<
  ReturnType<typeof gameState>,
  ReturnType<typeof rootState>
> = {
  namespaced: true,
  state: gameState,
  mutations: {
    increaseScore(state, by: number) {
      state.score += by;
    },
    moveX(state, squares: 1 | -1) {
      state.currentXSelection += squares
    }
  }
};
