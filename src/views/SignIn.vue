<template>
  <page class="signin">
    <div class="say-my-name__wrapper">
      <form @submit.prevent="signin" class="signin__form input-group">
        <h2 class="signin__title rustic">
          Sign in
        </h2>
        <text-view
          v-model="auth.email"
          type="email"
          placeholder="E-mail"
          class="text-view"
          required
        />
        <text-view
          v-model="auth.password"
          type="password"
          placeholder="Password"
          class="text-view"
          required
        />
        <div class="text-left">
          <router-link :to="{ name: 'game' }">
            Nah, I just wanna play
          </router-link>
        </div>
        <btn type="submit">
          Confirm
        </btn>
      </form>
      <footer-nav />
    </div>
  </page>
</template>

<script>
import Page from "@/components/home/Page";
import FooterNav from "@/components/home/FooterNav";
import TextView from "@/components/ui/TextView";
import Btn from "@/components/ui/Btn";
import { auth } from "@/plugins/firebase.plugin";

export default {
  components: {
    Page,
    FooterNav,
    TextView,
    Btn
  },
  data() {
    return {
      auth: {
        email: "",
        password: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    signin() {
      const { email, password } = this.auth;
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.$router.push({ name: "game" });
        })
        .catch(error => {
          this.errorMessage = error;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #3c2c17;
}
.say-my-name__wrapper {
  border: 10px solid #3c2c17;
  padding: 30px 20px;
  display: flex;
  align-items: center;
}

.signin__title {
  font-size: 40px;
  letter-spacing: 2px;
  padding: 0;
}

.input-group > * {
  margin-top: 7px;
}

.text-view {
  font-size: 25px;
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
