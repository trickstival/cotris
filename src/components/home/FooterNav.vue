<template>
  <footer class="footer-nav">
    <router-link :to="{ name: 'home' }">
      Home
    </router-link>
    <router-link :to="{ name: 'signin' }">
      Sign in
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
  grid-template-columns: 1fr 1fr;
  font-family: TheRustic;
  text-transform: uppercase;
  &,
  & a {
    color: #3c2c17;
  }
}
</style>
