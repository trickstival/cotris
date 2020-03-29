import { Tetramino } from './entities/Tetramino'
import tetraminos from './enums/tetraminos'

export class GravityMachine {
    constructor (private runAtEach: number) {
    }

    private runner = -1

    start () {
        this.runner = setInterval(() => {
        }, this.runAtEach)
    }

    stop () {
        clearInterval(this.runner)
    }
}
