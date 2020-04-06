<template>
  <section class="game-over full-center flex-column">
    <h1 class="title">
      Game Over!
    </h1>
    <btn @click="$store.dispatch('game/unstart')">
      Return to main menu
    </btn>
  </section>
</template>

<script>
import Btn from "@/components/ui/Btn";
export default {
  components: {
    Btn
  }
};
</script>

<style lang="scss" scoped>
.game-over {
  background-color: rgba(200, 200, 200, 0.8);
  padding: 10px;
  width: 600px;
  height: 600px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .game-over {
    height: 100%;
  }
}
</style>
