import { Scene } from "phaser";
import { BoardBlock } from "./BoardBlock";
import { Tetramino } from "./Tetramino";
import store from "@/store";
import { GravityMachine } from "../GravityMachine";

interface BoardOptions {
  numberOfBlocks: [number, number];
  scene: Scene;
}

interface DrawTetraminoOptions {
  x: number;
  color: number;
}

export class Board {
  private scene: Scene;
  private boardBlocks: BoardBlock[] = [];
  private gravityMachine: GravityMachine;

  constructor(public options: BoardOptions) {
    this.scene = options.scene;
    store.commit("game/setBoard", this);
    this.addBackground();
    this.drawBoard();
    this.setupStoreWatchers();
    this.gravityMachine = new GravityMachine({
      runAtEach: 500,
      board: this
    });
    this.gravityMachine.start();
  }

  private addBackground() {
    this.scene.add.rectangle(0, 0);
  }

  private drawBoard() {
    const [numberOfBlocksX, numberOfBlocksY] = this.options.numberOfBlocks;
    const blockSize = 35;

    const { width, height } = this.scene.game.canvas;

    const xStride = (width - blockSize * numberOfBlocksX) / 2;
    const yStride = (height - blockSize * numberOfBlocksY) / 2;

    for (let i = 0; i < numberOfBlocksY; i++) {
      const currentYPosition = i * blockSize + yStride;
      for (let j = 0; j < numberOfBlocksX; j++) {
        const currentXPosition = j * blockSize + xStride;
        const boardBlock = new BoardBlock({
          borderColor: 0x3c2c17,
          color: 0xffffff,
          scene: this.scene,
          size: blockSize,
          x: currentXPosition,
          y: currentYPosition
        });

        this.scene.add.existing(boardBlock);

        this.boardBlocks.push(boardBlock);
      }
    }
  }

  private setupStoreWatchers() {
    store.watch(
      state => state.game.currentXSelection,
      (_, oldX) => {
        const currentTetramino: Tetramino = store.state.game.currentTetramino;
        this.clearTetramino(currentTetramino, { x: oldX });
        this.drawTetramino(currentTetramino);
      }
    );

    store.watch(
      state => state.game.currentYSelection,
      (y, oldY) => {
        const currentTetramino: Tetramino = store.state.game.currentTetramino;
        this.clearTetramino(currentTetramino, { y: y ? oldY : y });
        this.drawTetramino(currentTetramino);
      }
    );
  }

  getBlock(x: number, y: number) {
    const [numberOfBlocksX] = this.options.numberOfBlocks;
    return this.boardBlocks[y * numberOfBlocksX + x];
  }

  clearTetramino(tetramino: Tetramino, options?: { x?: number; y?: number }) {
    const lowestY = tetramino.getLowestY();
    const {
      x = store.state.game.currentXSelection,
      y = store.state.game.currentYSelection
    } = options || {};

    for (const [relativeX, relativeY] of tetramino.currentPose) {
      const newX = x + relativeX;
      // TODO interpret gravity machine
      const newY = relativeY - lowestY + y;
      this.getBlock(newX, newY).clearBlock();
    }
  }

  drawTetramino(tetramino: Tetramino, options?: DrawTetraminoOptions) {
    const lowestY = tetramino.getLowestY();
    const { x = store.state.game.currentXSelection, color = 0xff0000 } =
      options || {};

    for (const [relativeX, relativeY] of tetramino.currentPose) {
      const newX = x + relativeX;
      // TODO interpret gravity machine
      const newY = relativeY - lowestY + store.state.game.currentYSelection;
      this.getBlock(newX, newY).fillWith(color);
    }
  }
}
