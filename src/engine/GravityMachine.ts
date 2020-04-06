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
  private unwatchers: Function[] = [];

  start() {
    const { runAtEach } = this.options;
    this.timer = this.board.scene.time.addEvent({
      loop: true,
      delay: runAtEach,
      callback: () => {
        const currentTetramino = gameState.currentTetramino;
        if (
          this.board.collides(currentTetramino, {
            x: gameState.currentXSelection,
            y: gameState.currentYSelection + 1
          })
        ) {
          store.dispatch("game/getNextTetramino");
          return;
        }
        store.commit("game/dropY");
      }
    });

    this.unwatchers.push(
      store.watch(
        state => state.game.isDead,
        isDead => {
          if (isDead) {
            this.pause();
          } else {
            this.resume();
          }
        }
      )
    );
  }

  resume() {
    if (this.timer) {
      this.timer.paused = false;
    }
  }

  pause() {
    if (this.timer) {
      this.timer.paused = true;
    }
  }

  destroy() {
    for (const unwatch of this.unwatchers) {
      unwatch();
    }
    this.pause();
    this.timer && this.timer.destroy();
    this.board.scene.time.removeAllEvents();
  }
}
