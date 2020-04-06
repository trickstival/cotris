<template>
  <img
    @click="$emit('click', $event)"
    class="play-button"
    src="@/assets/button.png"
  />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.play-button {
  $size: 140px;
  width: $size;
  height: $size;
  opacity: 0.7;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
