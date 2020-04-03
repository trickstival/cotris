import { Board } from './Board'
import { GravityMachine } from '../GravityMachine';
import store from '@/store';

interface LevelOptions {
    number: number
    speed: number
    goal: string
    board: Board
}

export class Level {
    private gravityMachine: GravityMachine

    constructor (public options: LevelOptions) {
        this.setupGravityMachine()
    }

    private setupGravityMachine () {
        this.gravityMachine = new GravityMachine({
            runAtEach: this.options.speed,
            board: this.options.board
          });
          store.watch(
            state => state.game.hasStarted,
            hasStarted => {
              if (hasStarted) {
                this.gravityMachine.start();
              }
            }
          );
    }

    destroy () {

    }
}
