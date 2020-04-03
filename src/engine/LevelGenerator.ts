import { Level } from "./entities/Level";
import { Board } from "./entities/Board";
import { Scene } from "phaser";
import { getRandomInt } from "@/utils/math.utils";
import store from '@/store';

const MAX_BOARD_HEIGHT = 12;
const MAX_BOARD_WIDTH = 10;
const MIN_BOARD_HEIGHT = 8;
const MIN_BOARD_WIDTH = 8;

interface LevelGeneratorOptions {
  scene: Scene;
}

export class LevelGenerator {
  currentLevel: Level;

  constructor(private options: LevelGeneratorOptions) {}

  private generateBoard() {
    const width = getRandomInt(MIN_BOARD_WIDTH, MAX_BOARD_WIDTH);
    const height = getRandomInt(MIN_BOARD_HEIGHT, MAX_BOARD_HEIGHT);
    return new Board({
      numberOfBlocks: [width, height],
      scene: this.options.scene
    });
  }

  private calcGoal(levelNumber: number) {
    const goal =  20 * levelNumber + getRandomInt(0, 9);
    store.commit("score/setGoal", goal);
  }

  private calcSpeed(levelNumber: number) {
    return 500 - 100 * Math.log(levelNumber)
  }

  next() {
    if (this.currentLevel) {
      this.currentLevel.destroy();
    }

    const board = this.generateBoard();
    const number = store.state.score.level;
    this.calcGoal(number)

    this.currentLevel = new Level({
      board,
      speed: this.calcSpeed(number),
      number
    });
  }
}
