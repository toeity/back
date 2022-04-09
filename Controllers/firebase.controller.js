const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyACd0gLddNXBw6ern3Ky_1Qnm86dLqMJc4",
    authDomain: "project-fbd57.firebaseapp.com",
    databaseURL: "https://project-fbd57-default-rtdb.firebaseio.com",
    projectId: "project-fbd57",
    storageBucket: "project-fbd57.appspot.com",
    messagingSenderId: "142049473484",
    appId: "1:142049473484:web:5bfb8f7756dde3e0512369",
    measurementId: "G-9GNXLQH7QY"
  };
const app =  initializeApp(firebaseConfig);

module.exports = app
