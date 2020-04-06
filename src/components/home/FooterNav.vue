<template>
  <footer class="footer-nav rustic">
    <router-link :to="{ name: 'home' }">
      Home
    </router-link>
    <div v-if="currentUser">Welcome {{ currentUser.displayName }}</div>
    <router-link v-else :to="{ name: isSignin ? 'signup' : 'signin' }">
      {{ isSignin ? "Sign up" : "Sign in" }}
    </router-link>
    <router-link :to="{ name: 'game' }">
      Game
    </router-link>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    isSignin() {
      return this.$route.name === "signin";
    },
    ...mapState("auth", ["currentUser"])
  }
};
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
