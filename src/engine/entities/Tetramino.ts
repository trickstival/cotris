import tetraminos from "../enums/tetraminos";

interface TetraminoOptions {
  poses: number[][][];
}

class TetraminoPose {
  positions: number[][] = []
  solidBlocks: number[][] = []

  collides (position: number[]) {
    const [positionX, positionY] = position
    return this.solidBlocks.some(([x, y]) => x === positionX && y === positionY)
  }
}

export class Tetramino {
  currentPose: TetraminoPose;

  constructor(private options: TetraminoOptions) {
    this.currentPose = new TetraminoPose();
    this.currentPose.positions = options.poses[0];
  }

  getLowestY() {
    return this.currentPose.positions.reduce(
      (acc, [, relativeY]) => (acc < relativeY ? acc : relativeY),
      0
    );
  }

  getHighestY() {
    return this.currentPose.positions.reduce(
      (acc, [, relativeY]) => (acc > relativeY ? acc : relativeY),
      0
    );
  }

  getLowestX() {
    return this.currentPose.positions.reduce(
      (acc, [relativeX]) => (acc < relativeX ? acc : relativeX),
      0
    );
  }

  getHighestX() {
    return this.currentPose.positions.reduce(
      (acc, [relativeX]) => (acc > relativeX ? acc : relativeX),
      0
    );
  }

  private static setupRandomSolidBlocks (tetramino: Tetramino) {
    for (const piece of tetramino.currentPose.positions) {
      tetramino.currentPose.solidBlocks.push(piece)
    }
  }

  static getRandomTetramino(): Tetramino {
    const tetraminoModel = tetraminos[Math.round(Math.random() * (tetraminos.length - 1))]
    const tetramino = new Tetramino({
      poses: tetraminoModel.positions
    });

    this.setupRandomSolidBlocks(tetramino)
    return tetramino
  }
}
