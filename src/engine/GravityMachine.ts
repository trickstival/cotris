import { Tetramino } from "./entities/Tetramino";
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

  private timer: Phaser.Time.TimerEvent;

  start() {
    const { runAtEach } = this.options;
    this.timer = this.board.scene.time.addEvent({
      loop: true,
      delay: runAtEach,
      callback: () => {
        const currentTetramino: Tetramino = gameState.currentTetramino;
        const highestY =
          gameState.currentYSelection + currentTetramino.getHighestY();
        const blockBeneath: BoardBlock = this.board.getBlock(
          gameState.currentXSelection,
          highestY + 1
        );
        if (!blockBeneath || blockBeneath.isFilled) {
          store.dispatch("game/getNextTetramino");
          return;
        }
        store.commit("game/dropY");
      }
    });

    store.watch(
      state => state.game.isDead,
      isDead => {
        if (isDead) {
          this.stop();
        } else {
          this.resume();
        }
      }
    );
  }

  resume() {
    this.timer.paused = false;
  }

  stop() {
    this.timer.paused = true;
  }
}
