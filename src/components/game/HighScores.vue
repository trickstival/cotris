<template>
  <section class="high-scores">
    <h4 class="high-scores__title">
      Highscores
    </h4>
    <div class="high-scores__panel">
      <div
        v-for="[player, score] in highscores"
        :key="player + score"
        class="high-scores__row"
      >
        <div>
          {{ player }}
        </div>
        <div>
          {{ score }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      highscores: [
        ["Joel", 29846],
        ["Anna", 25458],
        ["Tom", 18475],
        ["Oli", 13784],
        ["Elena", 10125]
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.high-scores {
  width: 100%;
}
.high-scores__title {
  text-align: center;
  font-weight: 300;
}
.high-scores__panel {
  border: 15px solid #de7d1f;
  width: 100%;
  font-family: AmericanCaptain;
}
.high-scores__row {
  color: #000;
  display: flex;
  padding: 0 10px;
  padding-top: 10px;
  justify-content: space-between;
  background-color: #ffe7b9;
  &:nth-child(odd) {
    background-color: #ffce78;
  }
}

@media screen and (max-width: 768px) {
  .high-scores__panel {
    font-size: 25px;
  }
}
</style>
