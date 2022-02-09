//TODO: change fb configurations
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyA5IXxEo28vMHuZ3eh2MTyJvhA6xj7Flo0",
  authDomain: "pavolive-5a7dd.firebaseapp.com",
  projectId: "pavolive-5a7dd",
  storageBucket: "pavolive-5a7dd.appspot.com",
  messagingSenderId: "929551388715",
  appId: "1:929551388715:web:ef50ac001b9d37e74e9a6e"
};

const app = initializeApp(firebaseConfig);

module.exports = app;