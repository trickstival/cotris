<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    $route(to) {
      document.title = to.meta.title || "Cotris";
      if (to.meta.icon) {
        const link = document.querySelector("[rel='icon']");
        link.setAttribute("href", to.meta.icon);
      }
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c2c17;
}

@import url("./assets/scss/global-styles.scss");

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
