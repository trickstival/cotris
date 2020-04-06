import { Scene } from "phaser";
import { Board } from "../entities/Board";
import store from "@/store";
import { LevelGenerator } from "../LevelGenerator";

export class MatchScene extends Scene {
  private board: Board;
  private timer?: number;
  private levelGenerator: LevelGenerator;
  private unwatchers: Function[] = [];
  private isDestroyed = false;

  constructor() {
    super({
      physics: {
        default: "arcade",
        arcade: {
          debug: true
        }
      }
    });
  }

  preload() {
    this.load.image("background", "publicAssets/wood.jpeg");
  }

  create() {
    if (this.isDestroyed) {
      return;
    }
    this.setupBoard();
    // @ts-ignore
    this.board.drawTetramino(store.state.game.currentTetramino);
    this.setupControls();
    this.setupTimer();
  }

  private setupInterval() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      store.commit("score/newSecond");
    }, 1000);
  }

  private clearInterval() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  private setupTimer() {
    this.unwatchers.push(
      store.watch(
        state => state.game.hasStarted,
        hasStarted => {
          if (!hasStarted) {
            this.clearInterval();
            this.board.boardGroup.setAlpha(0);
          } else {
            this.setupInterval();
          }
        }
      ),
      store.watch(
        state => state.game.isDead,
        isDead => {
          if (isDead) {
            this.clearInterval();
          } else if (store.state.game.hasStarted) {
            this.setupInterval();
          }
        }
      )
    );
  }

  private setupBoard() {
    const background = this.add.image(400, 300, "background");
    background.scaleX = this.sys.canvas.width / background.width;
    background.scaleY = this.sys.canvas.height / background.height;

    this.levelGenerator = new LevelGenerator({
      scene: this
    });

    this.levelGenerator.next();
    this.unwatchers.push(
      store.watch(
        state => state.score.level,
        () => {
          this.levelGenerator.next();
          this.board = this.levelGenerator.currentLevel.options.board;
          this.levelGenerator.currentLevel.start();
        }
      )
    );

    this.board = this.levelGenerator.currentLevel.options.board;
    this.board.boardGroup.setAlpha(0);
    background.setPosition(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );
  }

  private setupControls() {
    this.input.keyboard.on("keydown_LEFT", () => {
      store.dispatch("game/moveLeft");
    });

    this.input.keyboard.on("keydown_RIGHT", () => {
      store.dispatch("game/moveRight");
    });
  }

  private unwatchAll() {
    for (const unwatcher of this.unwatchers) {
      unwatcher();
    }
  }

  public destroy() {
    this.unwatchAll();
    this.input.keyboard.removeAllListeners();
    this.clearInterval();
    this.board && this.board.destroy();
    this.levelGenerator && this.levelGenerator.destroy();
    this.isDestroyed = true;
  }
}
