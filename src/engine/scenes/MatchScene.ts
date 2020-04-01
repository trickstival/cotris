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
      numberOfBlocks: [10, 10],
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
      store.dispatch('game/moveLeft')
    });

    this.input.keyboard.on("keydown_RIGHT", () => {
      store.dispatch('game/moveRight')
    });
  }
}
