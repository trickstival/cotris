import { Game as PhaserGame } from "phaser";
import { MatchScene } from "./scenes/MatchScene";

interface GameOptions {
  el: HTMLElement;
}

export class Game extends PhaserGame {
  constructor(options: GameOptions) {
    super({
      scene: [new MatchScene()],
      scale: {
        parent: options.el,
        height: "100%",
        width: "100%",
        mode: Phaser.Scale.RESIZE
      }
    });
  }

  destroy() {
    super.destroy(false);
    console.log("morreu game");
  }
}
