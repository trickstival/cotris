import { Scene } from "phaser";
import { Board } from "../entities/Board";
import { Tetramino } from "../entities/Tetramino";
import store from "@/store";

export class MatchScene extends Scene {
  private board: Board;

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
    this.load.image("background", "publicAssets/wood.jpg");
  }

  create() {
    this.setupBoard();
    // @ts-ignore
    this.board.drawTetramino(store.state.game.currentTetramino);
    this.setupControls();
  }

  private setupBoard() {
    const background = this.add.image(400, 300, "background");
    this.board = new Board({
      numberOfBlocks: [10, 7],
      scene: this
    });
    background.setPosition(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );
  }

  private setupControls() {
    const gameState = store.state.game;
    this.input.keyboard.on("keydown_LEFT", () => {
      const lowestX =
        gameState.currentXSelection + gameState.currentTetramino.getLowestX();
      if (lowestX <= 0) {
        return;
      }
      store.commit("game/moveX", -1);
    });

    const [numberOfXBlocks] = this.board.options.numberOfBlocks;
    this.input.keyboard.on("keydown_RIGHT", () => {
      const highestX =
        gameState.currentXSelection + gameState.currentTetramino.getHighestX();
      if (highestX >= numberOfXBlocks - 1) {
        return;
      }
      store.commit("game/moveX", 1);
    });
  }
}
