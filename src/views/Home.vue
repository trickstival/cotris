<template>
  <page class="home">
    <h1 class="home__title rustic">
      <img class="home__logo" src="@/assets/cotris.svg" />
      The Cotris Game
    </h1>
    <menu-selection class="home__menu-selection" />
    <footer class="home__footer">
      <div>
        Made by
        <a target="_blank" href="https://github.com/trickstival">trickstival</a>
      </div>
      <div>
        Designed by
        <a
          href="https://www.behance.net/gallery/94426465/Vintage-Tetris-GAME-UI?fbclid=IwAR0TMIoqMYfBhOMtJafzzdWshioQpSJdpdv3gaKU4uQ4g9Q2SUTn8n3r7XM"
        >
          Mateus Negrão
        </a>
      </div>
    </footer>
  </page>
</template>

<script>
import Page from "@/components/home/Page";
import MenuSelection from "@/components/home/MenuSelection";

export default {
  name: "Home",
  components: {
    Page,
    MenuSelection
  }
};
</script>

<style lang="scss" scoped>
.home__title {
  font-size: 60px;
}

.home__footer {
  position: absolute;
  bottom: 10px;
}

.home__menu-selection {
  margin-top: 20px;
}

.home__logo {
  width: 60px;
}
</style>
