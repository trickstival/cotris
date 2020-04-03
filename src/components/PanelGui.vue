<template>
  <div @click="onClickGui" class="panel-gui">
    <new-game v-if="!hasStarted" />
    <template v-else>
      <timer />
      <score />
    </template>
    <game-over v-if="isDead" class="game-over"></game-over>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import GameOver from "./GameOver.vue";
import NewGame from "./NewGame.vue";
import Score from "./Score.vue";
import Timer from "./Timer.vue";

export default Vue.extend({
  components: {
    GameOver,
    NewGame,
    Score,
    Timer
  },
  computed: {
    ...mapState("game", ["isDead", "hasStarted"])
  },
  methods: {
    onClickGui(event: MouseEvent) {
      if (!this.hasStarted) {
        return;
      }
      if (this.isDead) {
        this.$store.dispatch("game/restart");
        return;
      }

      const elRect = this.$el.getBoundingClientRect();
      this.$store.dispatch(
        "game/move" + (event.x - elRect.x > elRect.width / 2 ? "Right" : "Left")
      );
    }
  }
});
</script>

<style lang="scss" scoped>
.panel-gui {
  font-size: 40px;
  position: absolute;
  top: 0;
  left: 0;
  color: #3c2c17;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}
</style>
