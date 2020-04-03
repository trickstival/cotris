import { Board } from "./Board";
import { GravityMachine } from "../GravityMachine";
import store from "@/store";

interface LevelOptions {
  number: number;
  speed: number;
  board: Board;
}

export class Level {
  private gravityMachine: GravityMachine;
  private unwatchers: Function[] = [];

  constructor(public options: LevelOptions) {
    this.setupGravityMachine();
    this.setupWatchers();
  }

  private setupGravityMachine() {
    this.gravityMachine = new GravityMachine({
      runAtEach: this.options.speed,
      board: this.options.board
    });
  }

  private setupWatchers() {
    this.unwatchers.push(
      store.watch(
        state => state.game.hasStarted,
        hasStarted => {
          if (hasStarted) {
            this.start();
          }
        }
      ),

      store.watch(
        state => state.score.score,
        score => {
          if (score >= store.state.score.goal) {
            store.dispatch("score/nextLevel");
          }
        }
      )
    );
  }

  start() {
    this.gravityMachine.start();
  }

  destroy() {
    this.gravityMachine.destroy();
    this.options.board.destroy();
    for (const unwatcher of this.unwatchers) {
      unwatcher();
    }
  }
}
