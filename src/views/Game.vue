<template>
  <div class="game">
    <div class="game-gui-container">
      <div ref="canvasContainer"></div>
      <panel-gui></panel-gui>
    </div>
  </div>
</template>

<script>
import { Game } from "../engine/Application";
import PanelGui from "../components/game/PanelGui";

export default {
  components: {
    PanelGui
  },
  mounted() {
    new Game({
      el: this.$refs.canvasContainer
    });
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: TheRustic;
  src: url("../assets/fonts/TheRustic.ttf");
}
@font-face {
  font-family: AmericanCaptain;
  src: url("../assets/fonts/AmericanCaptain.ttf");
}
.game-gui-container {
  position: relative;
  width: 100%;
  font-family: TheRustic;
  text-transform: uppercase;
}
.game {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
