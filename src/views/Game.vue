<template>
  <div class="game">
    <div class="game-gui-container rustic">
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
.game-gui-container {
  position: relative;
  width: 100%;
}
.game {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
