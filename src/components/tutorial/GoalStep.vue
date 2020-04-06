<template>
  <div class="score-step full-center flex-column">
    <div class="description">
      When you reach your goal, a new level is unlocked, and the board is
      cleared
    </div>

    <h2 class="score-title rustic">
      Score: <span class="score-title__number"></span>
      Goal:
      <span class="score-title__goal"></span>
      Level:
      <span class="score-title__level"></span>
    </h2>
    <div class="tetraminos">
      <tetramino :model="blankModel" />
      <tetramino
        class="movable-tetramino"
        :model="[
          [0, 0, '#8a6536'],
          [0, 1, '#8a6536'],
          [0, 2, '#4f391d'],
          [1, 0, '#8a6536']
        ]"
      />
      <tetramino
        class="second-tetramino"
        :model="[
          [6, 5, '#4f391d'],
          [5, 5, '#8a6536'],
          [5, 6, '#4f391d'],
          [6, 6, '#8a6536']
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
.second-tetramino {
  position: absolute;
  top: 0;
  animation: fadeOutSquareTetramino 2s linear 0s infinite alternate;
}
.movable-tetramino {
  bottom: 0;
  position: absolute;
  animation: scoringTetramino 2s linear 0s infinite alternate;
}
.score-title__number::before {
  content: "0";
  animation: scoreNumber 2s linear 0s infinite alternate;
}

.score-title__goal::before {
  content: "4";
  animation: goalNumber 2s linear 0s infinite alternate;
}

.score-title__level::before {
  content: "1";
  animation: levelNumber 2s linear 0s infinite alternate;
}

@keyframes scoreNumber {
  from {
    content: "0";
  }
  to {
    content: "4";
  }
}

@keyframes goalNumber {
  from {
    content: "4";
  }
  to {
    content: "9";
  }
}

@keyframes levelNumber {
  from {
    content: "1";
  }
  to {
    content: "2";
  }
}

@keyframes scoringTetramino {
  0% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeOutSquareTetramino {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
