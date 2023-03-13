import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyDrx40v5wrgKj819__-xaa4kj581ZcCCzU",
  authDomain: "weather-app-cb47b.firebaseapp.com",
  projectId: "weather-app-cb47b",
  storageBucket: "weather-app-cb47b.appspot.com",
  messagingSenderId: "846457535942",
  appId: "1:846457535942:web:d2fb0c967f267fc67646c7",
  measurementId: "G-5B8KJEJZ4Y",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
