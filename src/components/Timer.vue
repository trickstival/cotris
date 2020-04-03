<template>
  <footer class="timer">
    {{ formattedTime }}
  </footer>
</template>

<script>
import { mapState } from "vuex";

const date = new Date();

export default {
  computed: {
    ...mapState("game", ["seconds"]),
    formattedTime() {
      date.setMinutes(0);
      date.setSeconds(this.seconds);
      const hours = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${hours}:${seconds}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.timer {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 30px;
  user-select: none;
  -webkit-touch-callout: none;
}
</style>
