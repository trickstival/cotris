<template>
  <section class="game-over">
    <h1 class="title">
      Game Over!
    </h1>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.game-over {
  background-color: rgba(200, 200, 200, 0.8);
  padding: 10px;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .game-over {
    height: 100%;
  }
}
</style>
