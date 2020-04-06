<template>
  <div class="game">
    <div class="game-gui-container rustic">
      <div ref="canvasContainer"></div>
      <panel-gui></panel-gui>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Application } from "../engine/Application";
import PanelGui from "../components/game/PanelGui.vue";
import { MatchScene } from "../engine/scenes/MatchScene";

export default Vue.extend({
  components: {
    PanelGui
  },
  data() {
    return {
      application: (null as unknown) as Application
    };
  },
  beforeDestroy() {
    const { matchScene } = this.application;
    matchScene.destroy();
  },
  mounted() {
    this.application = new Application({
      el: this.$refs.canvasContainer as HTMLCanvasElement
    });
  }
});
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
