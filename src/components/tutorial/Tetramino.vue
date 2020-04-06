<template>
  <div
    class="tetramino"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <div
      v-for="([x, y, fill], idx) in model"
      :key="idx"
      :style="{
        backgroundColor: fill,
        transform: `translate(${x * 30}px, ${y * 30}px)`
      }"
      class="block"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Array,
      default: () => [[0, 0, 0]]
    }
  },
  computed: {
    width() {
      return (
        30 *
        (this.model.reduce((higherX, [x]) => (x > higherX ? x : higherX), 0) +
          1)
      );
    },
    height() {
      return (
        30 *
        (this.model.reduce((higherY, [, y]) => (y > higherY ? y : higherY), 0) +
          1)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.tetramino {
  position: relative;
}
.block {
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid #3c2c17;
  width: 30px;
  height: 30px;
  background-color: #fff;
}
</style>
