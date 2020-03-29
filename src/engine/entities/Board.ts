import { Scene } from "phaser";
import { BoardBlock } from './BoardBlock';
import { Tetramino } from './Tetramino';
import store from '@/store'

interface BoardOptions {
  numberOfBlocks: [number, number];
  scene: Scene;
}

interface DrawTetraminoOptions {
  x: number
  color: number
}

export class Board {
  private scene: Scene;
  private boardBlocks: BoardBlock[] = []

  constructor(public options: BoardOptions) {
    this.scene = options.scene;
    this.addBackground();
    this.drawBoard();
    this.setupStoreWatchers()
  }

  private addBackground() {
    this.scene.add.rectangle(0, 0);
  }

  private drawBoard() {
    const [numberOfBlocksX, numberOfBlocksY] = this.options.numberOfBlocks;
    const blockSize = 35

    const { width, height } = this.scene.game.canvas

    const xStride = (width - blockSize * numberOfBlocksX) / 2
    const yStride = (height - blockSize * numberOfBlocksY) / 2
    
    for (let i = 0; i < numberOfBlocksY; i++) {
      const currentYPosition = i * blockSize + yStride
      for (let j = 0; j < numberOfBlocksX; j++) {
        const currentXPosition = j * blockSize + xStride
        const boardBlock = new BoardBlock({
            borderColor: 0x3c2c17,
            color: 0xffffff,
            scene: this.scene,
            size: blockSize,
            x: currentXPosition,
            y: currentYPosition
        })

        this.scene.add.existing(boardBlock)

        this.boardBlocks.push(boardBlock)
      }
    }
  }

  private setupStoreWatchers () {
    store.watch(
      state => state.game.currentXSelection,
      (_, oldX) => {
        const currentTetramino: Tetramino = store.state.game.currentTetramino
        this.drawTetramino(currentTetramino, { x: oldX, color: 0xffffff })
        this.drawTetramino(currentTetramino)
      }
    )
  }

  drawTetramino (tetramino: Tetramino, options?: DrawTetraminoOptions) {
    const [numberOfBlocksX] = this.options.numberOfBlocks
    const lowestY = tetramino.getLowestY()
    const { x = store.state.game.currentXSelection, color = 0xff0000 } = options || {}

    for (const [relativeX, relativeY] of tetramino.currentPose) {
      const newX = x + relativeX
      // TODO interpret gravity machine
      const newY = relativeY - lowestY
      this.boardBlocks[newY * numberOfBlocksX + newX].fillWith(color)
    }
  }
}
