<template>
  <div class="panel-gui">
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
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("game", ["score", "level"])
  }
};
</script>

<style lang="scss" scoped>
.panel-gui {
  font-size: 40px;
  position: absolute;
  top: 0;
  left: 0;
  color: #3c2c17;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 15px;
  cursor: default;
  user-select: none;
  -webkit-touch-callout: none;
}
</style>
