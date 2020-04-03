<template>
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
        Goal
      </div>
      <div>
        {{ goal }}
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
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("score", ["level", "score", "goal"])
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
</style>
