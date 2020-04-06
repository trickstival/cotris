<template>
  <div class="score-step full-center flex-column">
    <div class="description">
      Your score is increased everytime a new piece is placed
    </div>

    <h2 class="score-title rustic">
      Score: <span class="score-title__number"></span>
    </h2>
    <div class="tetraminos">
      <tetramino :model="blankModel" />
      <tetramino
        class="movable-tetramino"
        :model="[
          [0, 0, '#8a6536'],
          [0, 1, '#8a6536'],
          [0, 2, '#4f391d'],
          [1, 2, '#8a6536']
        ]"
      />
    </div>
  </div>
</template>

<script>
import Tetramino from "./Tetramino";
export default {
  components: {
    Tetramino
  },
  computed: {
    blankModel() {
      const model = [];
      const width = 7;
      const height = 7;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          model.push([x, y, "#fff"]);
        }
      }

      return model;
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  margin-bottom: 30px;
}
.tetraminos {
  position: relative;
}
.movable-tetramino {
  bottom: 0;
  position: absolute;
  animation: scoringTetramino 0.7s linear 0s infinite alternate;
}
.score-title__number::before {
  content: "0";
  animation: scoreNumber 0.7s linear 0s infinite alternate;
}

@keyframes scoreNumber {
  from {
    content: "0";
  }
  to {
    content: "4";
  }
}

@keyframes scoringTetramino {
  from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
