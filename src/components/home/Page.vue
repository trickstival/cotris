<template>
  <div class="page">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
  position: absolute;
  background-image: url("../../../public/publicAssets/wood.jpeg");
  background-position: center;
  background-size: 100vw;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
