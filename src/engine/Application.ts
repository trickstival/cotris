import { Game as PhaserGame } from "phaser";
import { MatchScene } from "./scenes/MatchScene";

interface GameOptions {
  el: HTMLElement;
}

export class Application {
  public matchScene: MatchScene;
  public game: PhaserGame;
  constructor(options: GameOptions) {
    this.matchScene = new MatchScene();

    this.game = new PhaserGame({
      scene: [this.matchScene],
      scale: {
        parent: options.el,
        height: "100%",
        width: "100%",
        mode: Phaser.Scale.RESIZE
      }
    });
  }

  destroy() {
    this.game.destroy(false);
  }
}
