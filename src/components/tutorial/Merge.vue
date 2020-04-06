<template>
  <div class="merge full-center flex-column">
    <div class="description">
      Filled blocks can be merged, while collision blocks can't
    </div>

    <div class="d-flex justify-content-space-around full-width">
      <div class="d-flex flex-column justify-content-end">
        <tetramino
          :model="[
            [0, 0, '#8a6536'],
            [0, 1, '#8a6536'],
            [0, 2, '#8a6536'],
            [0, 3, '#8a6536']
          ]"
          class="first-piece"
        />
        <tetramino
          :model="[
            [0, 0, '#8a6536'],
            [0, 1, '#8a6536'],
            [1, 0, '#8a6536'],
            [1, 1, '#8a6536'],
            [0, -1, '#fff'],
            [0, -2, '#fff'],
            [0, -3, '#fff'],
            [0, -4, '#fff'],
            [1, -1, '#fff'],
            [1, -2, '#fff'],
            [1, -3, '#fff'],
            [1, -4, '#fff']
          ]"
          class="second-piece"
        />
      </div>
      <div class="d-flex flex-column justify-content-end">
        <tetramino
          :model="[
            [0, 0, '#8a6536'],
            [0, 1, '#8a6536'],
            [1, 0, '#8a6536'],
            [1, 1, '#8a6536']
          ]"
          class="third-piece"
        />
        <tetramino
          :model="[
            [0, 0, '#4f391d'],
            [0, 1, '#8a6536'],
            [0, 2, '#8a6536'],
            [1, 2, '#8a6536'],
            [1, 0, '#fff'],
            [1, 1, '#fff'],
            [1, -1, '#fff'],
            [0, -3, '#fff'],
            [1, -3, '#fff'],
            [0, -1, '#fff']
          ]"
          class="fourth-piece"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tetramino from "./Tetramino";
export default {
  components: {
    Tetramino
  }
};
</script>

<style lang="scss" scoped>
.second-piece,
.fourth-piece {
  margin-top: 5px;
}

.first-piece {
  z-index: 1;
  animation-name: firstPieceAnimation;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
  transform: translateY(0);
}

.third-piece {
  z-index: 1;
  animation-name: thirdPieceAnimation;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
  transform: translateY(0);
}

.description {
  margin-bottom: 15px;
}

@keyframes firstPieceAnimation {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(35px);
  }

  100% {
    transform: translateY(65px);
  }
}

@keyframes thirdPieceAnimation {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(5px);
  }
}
</style>
