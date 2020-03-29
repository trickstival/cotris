import tetraminos from '../enums/tetraminos'

interface TetraminoOptions {
  poses: number[][][];
}

export class Tetramino {
  public currentPose: number[][]
  constructor(private options: TetraminoOptions) {
    this.currentPose = options.poses[0]
  }

  getLowestY () {
    return this.currentPose.reduce((acc, [, relativeY]) => acc < relativeY ? acc : relativeY, 0)
  }

  getLowestX () {
    return this.currentPose.reduce((acc, [relativeX]) => acc < relativeX ? acc : relativeX, 0)
  }

  getHighestX () {
    return this.currentPose.reduce((acc, [relativeX]) => acc > relativeX ? acc : relativeX, 0)
  }

  static getRandomTetramino (): Tetramino {
        return new Tetramino({
            poses: tetraminos[Math.round(Math.random() * (tetraminos.length - 1))]
        })
    }
}
