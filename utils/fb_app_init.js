const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyDC6hU10GKH1XVxogka1MLInmChtiDt5ec",
  authDomain: "prodaabespayment.firebaseapp.com",
  projectId: "prodaabespayment",
  storageBucket: "prodaabespayment.appspot.com",
  messagingSenderId: "979758786903",
  appId: "1:979758786903:web:45c22ad31cc9c1d114f612"
};

const app = initializeApp(firebaseConfig);

export default app;