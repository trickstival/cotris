import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: () => import('../views/Tutorial.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import("../views/SignIn.vue")
  },
  {
    path: "/game",
    name: "game",
    component: () => import("../views/Game.vue"),
    meta: {
      title: "Cotris - Game"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
