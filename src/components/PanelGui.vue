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
    <game-over v-if="isDead" class="game-over"></game-over>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GameOver from "./GameOver";

export default {
  components: {
    GameOver
  },
  computed: {
    ...mapState("game", ["score", "level", "isDead"])
  },
  methods: {
    onClickGui() {
      if (this.isDead) {
        this.$store.commit("game/restart");
      }
    }
  }
};
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
