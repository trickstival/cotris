import { Module } from "vuex";
import { rootState } from ".";
import { Tetramino } from "@/engine/entities/Tetramino";
import { Board } from "@/engine/entities/Board";

const initialTetramino = Tetramino.getRandomTetramino();

export const gameState = () => ({
  currentXSelection: 3,
  currentYSelection: -initialTetramino.getLowestY(),
  currentTetramino: initialTetramino,
  nextTetramino: Tetramino.getRandomTetramino(),
  board: (null as unknown) as Board,
  isDead: false,
  hasStarted: false
});

export const game: Module<
  ReturnType<typeof gameState>,
  ReturnType<typeof rootState>
> = {
  namespaced: true,
  state: gameState,
  mutations: {
    moveX(state, squares: 1 | -1) {
      if (state.isDead) {
        return;
      }
      if (
        state.board.collides(state.currentTetramino, {
          x: state.currentXSelection + squares,
          y: state.currentYSelection
        })
      ) {
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
      state.board.boardGroup.setAlpha(1);
    },
    restart(state) {
      const initialTetramino = Tetramino.getRandomTetramino();
      state.currentXSelection = Math.round(
        state.board.options.numberOfBlocks[0] / 2
      );
      state.currentYSelection = -initialTetramino.getLowestY();
      state.currentTetramino = initialTetramino;
      state.nextTetramino = Tetramino.getRandomTetramino();
      state.board.clear();
      state.board.drawTetramino(state.currentTetramino);
      state.board.boardGroup.setAlpha(1);
      state.isDead = false;
    },
    die(state) {
      state.isDead = true;
    }
  },
  actions: {
    resurrect({ dispatch, commit }) {
      commit("restart");
      dispatch("score/resurrect", null, { root: true });
    },
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
      commit(
        "score/increaseScore",
        state.currentTetramino.currentPose.positions.length,
        {
          root: true
        }
      );
      if (
        state.board.collides(state.nextTetramino, {
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
