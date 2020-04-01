<template>
  <div @click="onClickGui" class="panel-gui">
    <header class="gui-header">
      <div>
        <div>
          Score
        </div>
        <div>
          {{ score }}
        </div>
      </div>
      <div>
        <div>
          Level
        </div>
        <div>
          {{ level }}
        </div>
      </div>
    </header>
    <new-game v-if="!hasStarted"></new-game>
    <game-over v-if="isDead" class="game-over"></game-over>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import GameOver from "./GameOver.vue";
import NewGame from "./NewGame.vue";

export default Vue.extend({
  components: {
    GameOver,
    NewGame
  },
  computed: {
    ...mapState("game", ["score", "level", "isDead", "hasStarted"])
  },
  methods: {
    onClickGui(event: MouseEvent) {
      if (!this.hasStarted) {
        this.$store.commit("game/start");
        return;
      }

      if (this.isDead) {
        this.$store.commit("game/restart");
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
.gui-header {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 15px;
  user-select: none;
  -webkit-touch-callout: none;
}

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
