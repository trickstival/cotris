import tetraminos from "../enums/tetraminos";
import { getRandomInt } from "@/utils/math.utils";
import { caches } from "@/utils/cache.utils";

interface TetraminoOptions {
  poses: number[][][];
}

class TetraminoPose {
  positions: number[][] = [];
  solidBlocks: number[][] = [];

  collides(position: number[]) {
    const [positionX, positionY] = position;
    return this.solidBlocks.some(
      ([x, y]) => x === positionX && y === positionY
    );
  }
}

export class Tetramino {
  currentPose: TetraminoPose;
  private cache = new Map();

  constructor(public options: TetraminoOptions) {
    this.setPose(0);
  }

  setPose(index: number) {
    this.currentPose = new TetraminoPose();
    const newPose = this.options.poses[index];
    if (newPose) {
      this.currentPose.positions = newPose;
    }
  }

  @caches()
  getLowestY() {
    const lowestX = this.cache.get("lowestX");
    if (lowestX) {
      return lowestX;
    }
    return this.currentPose.positions.reduce(
      (acc, [, relativeY]) => (acc < relativeY ? acc : relativeY),
      0
    );
  }

  @caches()
  getHighestY() {
    return this.currentPose.positions.reduce(
      (acc, [, relativeY]) => (acc > relativeY ? acc : relativeY),
      0
    );
  }

  @caches()
  getLowestX() {
    return this.currentPose.positions.reduce(
      (acc, [relativeX]) => (acc < relativeX ? acc : relativeX),
      0
    );
  }

  @caches()
  getHighestX() {
    return this.currentPose.positions.reduce(
      (acc, [relativeX]) => (acc > relativeX ? acc : relativeX),
      0
    );
  }

  private static setupRandomSolidBlocks(tetramino: Tetramino) {
    for (const piece of tetramino.currentPose.positions) {
      if (Math.random() < 0.35) {
        tetramino.currentPose.solidBlocks.push(piece);
      }
    }
  }

  static getRandomTetramino(): Tetramino {
    const tetraminoModel =
      tetraminos[Math.round(Math.random() * (tetraminos.length - 1))];
    const tetramino = new Tetramino({
      poses: tetraminoModel.positions
    });

    tetramino.setPose(getRandomInt(0, tetramino.options.poses.length - 1));

    this.setupRandomSolidBlocks(tetramino);
    return tetramino;
  }
}
