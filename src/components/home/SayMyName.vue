<template>
  <section class="say-my-name">
    <h2 class="say-my-name__title">
      Type your name
    </h2>
    <div class="input-group">
      <text-view class="text-view" />
      <btn>
        Confirm
      </btn>
    </div>
  </section>
</template>

<script>
import TextView from "../ui/TextView";
import Btn from "../ui/Btn";

export default {
  components: {
    TextView,
    Btn
  }
};
</script>

<style lang="scss" scoped>
.say-my-name {
  font-family: CaptainAmerica;
  padding: 0 30px;
}
.say-my-name__title {
  margin-bottom: 20px;
  font-size: 35px;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr auto;
  & > :first-child {
    border-right: none;
  }
  & > :last-child {
    border-left: none;
  }
}

.text-view {
  font-size: 35px;
}

@media screen and (max-width: 768px) {
  .text-view {
    font-size: 25px;
  }
}
</style>
