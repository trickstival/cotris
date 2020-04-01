import { Module } from "vuex";
import { rootState } from ".";
import { Tetramino } from "@/engine/entities/Tetramino";
import { Board } from "@/engine/entities/Board";

const initialTetramino = Tetramino.getRandomTetramino();

export const gameState = () => ({
  score: 0,
  level: 1,
  currentGoal: 0,
  currentXSelection: 3,
  currentYSelection: -initialTetramino.getLowestY(),
  currentTetramino: initialTetramino,
  nextTetramino: Tetramino.getRandomTetramino(),
  board: (null as unknown) as Board,
  isDead: false,
  hasStarted: false,
  seconds: 0
});

export const game: Module<
  ReturnType<typeof gameState>,
  ReturnType<typeof rootState>
> = {
  namespaced: true,
  state: gameState,
  mutations: {
    newSecond(state) {
      state.seconds++;
    },
    increaseScore(state, by: number) {
      state.score += by;
    },
    moveX(state, squares: 1 | -1) {
      if (state.isDead) {
        return;
      }
      state.currentXSelection += squares;
    },
    dropY(state) {
      state.currentYSelection++;
    },
    setBoard(state, board: Board) {
      state.board = board;
    },
    start(state) {
      state.hasStarted = true;
    },
    restart(state) {
      const initialTetramino = Tetramino.getRandomTetramino();
      state.score = 0;
      state.level = 1;
      state.seconds = 0;
      state.currentGoal = 0;
      state.currentXSelection = Math.round(
        state.board.options.numberOfBlocks[0] / 2
      );
      state.currentYSelection = -initialTetramino.getLowestY();
      state.nextTetramino = Tetramino.getRandomTetramino();
      state.board.clear();
      state.isDead = false;
    },
    die(state) {
      state.isDead = true;
    }
  },
  actions: {
    getNextTetramino({ state, commit }) {
      const [boardWidth] = state.board.options.numberOfBlocks;
      const boardNumOfPositions = boardWidth - 1;
      const highestX = state.nextTetramino.getHighestX();
      const lowestX = state.nextTetramino.getLowestX();
      // Moving x when reach bounds and next tetramino exceeds board bounds
      if (highestX + state.currentXSelection > boardNumOfPositions) {
        commit("moveX", -highestX);
      } else if (state.currentXSelection + lowestX < 0) {
        commit("moveX", -lowestX);
      }

      const nextY = -state.nextTetramino.getLowestY();
      state.score += state.currentTetramino.currentPose.length;
      if (
        state.board.conflicts(state.nextTetramino, {
          x: state.currentXSelection,
          y: nextY
        })
      ) {
        commit("die");
        return;
      }

      state.currentTetramino = state.nextTetramino;
      state.nextTetramino = Tetramino.getRandomTetramino();
      state.currentYSelection = nextY;
    },
    moveLeft({ commit, state }) {
      const lowestX =
        state.currentXSelection + state.currentTetramino.getLowestX();
      if (lowestX <= 0) {
        return;
      }
      commit("moveX", -1);
    },
    moveRight({ commit, state }) {
      const highestX =
        state.currentXSelection + state.currentTetramino.getHighestX();
      if (highestX >= state.board.options.numberOfBlocks[0] - 1) {
        return;
      }
      commit("moveX", 1);
    }
  }
};
