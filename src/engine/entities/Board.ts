import { Scene } from "phaser";
import { BoardBlock } from "./BoardBlock";
import { Tetramino } from "./Tetramino";
import store from "@/store";

interface BoardOptions {
  numberOfBlocks: [number, number];
  scene: Scene;
}

interface DrawTetraminoOptions {
  x: number;
  color: number;
  solidBlockColor: number;
}

export class Board {
  scene: Scene;
  private boardBlocks: BoardBlock[] = [];
  private boardContainer: Phaser.GameObjects.Container;
  private background: Phaser.GameObjects.Rectangle;
  private unwatchers: Function[] = [];
  public boardGroup: Phaser.GameObjects.Group;

  constructor(public options: BoardOptions) {
    this.scene = options.scene;
    store.commit("game/setBoard", this);
    this.addBackground();
    this.drawBoard();
    this.setupStoreWatchers();
  }

  private addBackground() {
    this.background = this.scene.add.rectangle(0, 0);
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

        this.boardBlocks.push(boardBlock);
      }
    }
    this.boardContainer = this.scene.add.container(0, 0, this.boardBlocks);
    this.boardGroup = this.scene.add.group(this.boardBlocks);
  }

  private setupStoreWatchers() {
    this.unwatchers.push(
      store.watch(
        state => state.game.currentXSelection,
        (_, oldX) => {
          const currentTetramino: Tetramino = store.state.game.currentTetramino;
          this.clearTetramino(currentTetramino, { x: oldX });
          this.drawTetramino(currentTetramino);
        }
      ),

      store.watch(
        state => state.game.currentYSelection,
        (y, oldY) => {
          const currentTetramino: Tetramino = store.state.game.currentTetramino;
          this.clearTetramino(currentTetramino, { y: y > oldY ? oldY : y });
          this.drawTetramino(currentTetramino);
        }
      )
    );
  }

  collides(tetramino: Tetramino, { x, y }: { x: number; y: number }) {
    debugger
    const { currentPose } = tetramino
    for (const position of currentPose.positions) {
      const [relativeX, relativeY] = position
      // If there is any block of this tetramino beneath this block, don't test collision
      if (currentPose.positions.some(([posX, posY]) => posX === relativeX && posY > relativeY)) {
        continue
      }
      const boardBlock = this.getBlock(x + relativeX, y + relativeY)
      if (!boardBlock || boardBlock.collides || (boardBlock.isFilled && currentPose.collides(position))) {
        return true;
      }
    }
    return false;
  }

  getBlock(x: number, y: number) {
    const [numberOfBlocksX] = this.options.numberOfBlocks;
    return this.boardBlocks[y * numberOfBlocksX + x];
  }

  clear() {
    for (const block of this.boardBlocks) {
      block.clearBlock();
    }
  }

  clearTetramino(tetramino: Tetramino, options?: { x?: number; y?: number }) {
    const {
      x = store.state.game.currentXSelection,
      y = store.state.game.currentYSelection
    } = options || {};

    for (const [relativeX, relativeY] of tetramino.currentPose.positions) {
      const newX = x + relativeX;
      const newY = relativeY + y;
      this.getBlock(newX, newY)?.clearBlock();
    }
  }

  drawTetramino(tetramino: Tetramino, options?: DrawTetraminoOptions) {
    const { color = 0x8a6536, solidBlockColor = 0x4f391d } = options || {};
    const x = store.state.game.currentXSelection;
    const y = store.state.game.currentYSelection;

    for (const position of tetramino.currentPose.positions) {
      const [relativeX, relativeY] = position
      const newX = x + relativeX;
      const newY = y + relativeY;
      const block = this.getBlock(newX, newY);
      if (!block.isFilled) {
        if (tetramino.currentPose.collides(position)) {
          block.fillWith(solidBlockColor);
          block.collides = true;
        } else {
          block.fillWith(color);
        }
      }
    }
  }

  destroy() {
    this.boardGroup.destroy();
    this.boardContainer.destroy();
    this.background.destroy();
    for (const unwatcher of this.unwatchers) {
      unwatcher();
    }
  }
}
