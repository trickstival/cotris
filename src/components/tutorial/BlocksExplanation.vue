<template>
  <div class="blocks-explanation">
    There are 3 types of blocks:
    <div class="full-center blocks">
      <div class="block flex-column">
        <tetramino />
        Empty
      </div>
      <div class="block block__filled flex-column">
        <tetramino :model="[[0, 0, '#8a6536']]" />
        Filled
      </div>
      <div class="block block__collision flex-column">
        <tetramino :model="[[0, 0, '#4f391d']]" />
        Collision
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
.blocks {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  padding: 15px 0;
}

.block {
  display: flex;
  justify-content: center;
}

.block > :first-child {
  height: 30px;
  margin-bottom: 5px;
  left: 50%;
  margin-left: -15px;
}
</style>
