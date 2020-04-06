<template>
  <footer class="footer-nav rustic">
    <router-link :to="{ name: 'home' }">
      Home
    </router-link>
    <router-link :to="{ name: 'signin' }">
      Sign in
    </router-link>
    <router-link :to="{ name: 'game' }">
      Game
    </router-link>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-nav {
  font-size: 28px;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  &,
  & a {
    color: #3c2c17;
  }
}
</style>
