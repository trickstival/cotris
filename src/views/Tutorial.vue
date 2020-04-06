<template>
  <page class="tutorial">
    <h1 class="tutorial__title rustic">
      Tutorial
    </h1>
    <main class="tutorial__main full-center">
      <swiper :options="swiperOptions" class="swiper">
        <swiper-slide class="full-center flex-column slide">
          Cotris is not Tetris. <br />
          This game works in a different way.
          <blocks-explanation class="blocks-explanation" />
          <div class="swipe-to-continue">
            Swipe right to continue
          </div>
        </swiper-slide>
        <swiper-slide class="full-center flex-column slide">
          <merge />
        </swiper-slide>
        <swiper-slide class="full-center slide">
          <score-step />
        </swiper-slide>
        <swiper-slide class="full-center slide">
          <goal-step />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </main>
    <footer-nav />
  </page>
</template>

<script>
import Page from "@/components/home/Page";
import FooterNav from "@/components/home/FooterNav";
import BlocksExplanation from "@/components/tutorial/BlocksExplanation";
import Merge from "@/components/tutorial/Merge";
import ScoreStep from "@/components/tutorial/ScoreStep";
import GoalStep from "@/components/tutorial/GoalStep";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Page,
    FooterNav,
    BlocksExplanation,
    Swiper,
    SwiperSlide,
    Merge,
    ScoreStep,
    GoalStep
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.tutorial {
  --swiper-theme-color: #3c2c17;
}

.blocks-explanation {
  margin-top: 10px;
}
.tutorial {
  padding: 40px 10px;
  justify-content: space-between;
}
.tutorial__title {
  font-size: 45px;
}

.swiper {
  height: 100%;
  & > .slide {
    width: 100% !important;
  }
}

.swipe-to-continue {
  margin-top: 30px;
}

.tutorial__main {
  position: relative;
  font-size: 18px;
  font-weight: 800;
  width: 100%;
  flex: 1;
}
</style>
