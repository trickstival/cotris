<template>
  <page class="signin">
    <div class="say-my-name__wrapper">
      <say-my-name class="say-my-name" />
      <footer-nav />
    </div>
  </page>
</template>

<script>
import Page from "@/components/home/Page";
import SayMyName from "@/components/home/SayMyName";
import FooterNav from "@/components/home/FooterNav";

export default {
  components: {
    Page,
    SayMyName,
    FooterNav
  }
};
</script>

<style lang="scss" scoped>
.say-my-name__wrapper {
  border: 10px solid #3c2c17;
  padding: 30px 20px;
  display: flex;
  align-items: center;
}

@media screen and (min-width: 1000px) {
  .say-my-name__wrapper {
    width: 500px;
  }
}

@media screen and (max-width: 768px) {
  .say-my-name__wrapper {
    height: 100%;
    position: relative;
  }
}
</style>
