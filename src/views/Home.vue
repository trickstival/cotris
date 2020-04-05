<template>
  <div class="home">
    <say-my-name />
  </div>
</template>

<script>
import SayMyName from "../components/home/SayMyName";

export default {
  name: "Home",
  components: {
    SayMyName
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  background-image: url("../../public/publicAssets/wood.jpeg");
  background-position: center;
  background-size: 100vw;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
