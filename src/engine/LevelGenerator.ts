import { Level } from './entities/Level';
import { Board } from './entities/Board';
import { Scene } from 'phaser';
import { getRandomInt } from '@/utils/math.utils';

const MAX_BOARD_HEIGHT = 12
const MAX_BOARD_WIDTH = 10
const MIN_BOARD_HEIGHT = 8
const MIN_BOARD_WIDTH = 8

interface LevelGeneratorOptions {
    scene: Scene
}

export class LevelGenerator {
    currentLevel: Level

    constructor (private options: LevelGeneratorOptions) {

    }

    private generateBoard () {
        const width = getRandomInt(MIN_BOARD_WIDTH, MAX_BOARD_WIDTH)
        const height = getRandomInt(MIN_BOARD_HEIGHT, MAX_BOARD_HEIGHT)
        return new Board({
            numberOfBlocks: [
                width,
                height
            ],
            scene: this.options.scene
        })
    }

    next () {
        if (this.currentLevel) {
            this.currentLevel.destroy()
        }

        const board = this.generateBoard()
        this.currentLevel = new Level({
            board,
            speed: 500,
            goal: '10',
            number: (this.currentLevel?.options.number + 1) || 1
        })
    }
}
