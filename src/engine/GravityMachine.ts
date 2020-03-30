import { Tetramino } from "./entities/Tetramino";
import tetraminos from "./enums/tetraminos";
import store from "@/store";
import { Board } from "./entities/Board";
import { BoardBlock } from "./entities/BoardBlock";

const gameState = store.state.game;

interface GravityMachineOptions {
  runAtEach: number;
  board?: Board;
}

export class GravityMachine {
  private board: Board;
  constructor(private options: GravityMachineOptions) {
    this.board = options.board || gameState.board;
  }

  private runner = -1;

  start() {
    const { runAtEach } = this.options;
    this.runner = setInterval(() => {
      const currentTetramino: Tetramino = gameState.currentTetramino;
      const highestY =
        gameState.currentYSelection -
        currentTetramino.getLowestY() +
        currentTetramino.getHighestY();
      const blockBeneath: BoardBlock = this.board.getBlock(
        gameState.currentXSelection,
        highestY + 1
      );
      if (!blockBeneath || blockBeneath.isFilled) {
        store.dispatch("game/getNextTetramino");
        return;
      }
      store.commit("game/dropY");
    }, runAtEach);
  }

  stop() {
    clearInterval(this.runner);
  }
}
