import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import router from "@/router";
import store from "@/store";

// TODO: move to .env
export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBR9G6j5-HG64JKjKltgMljOMCrSwTTV20",
  authDomain: "cotris-7f3ed.firebaseapp.com",
  databaseURL: "https://cotris-7f3ed.firebaseio.com",
  projectId: "cotris-7f3ed",
  storageBucket: "cotris-7f3ed.appspot.com",
  messagingSenderId: "898668344457",
  appId: "1:898668344457:web:0f6d3b6539fcb015f1c258",
  measurementId: "G-KEVX0TFT36"
});

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("auth/setCurrentUser", user);
  }
});

firebase.analytics();
