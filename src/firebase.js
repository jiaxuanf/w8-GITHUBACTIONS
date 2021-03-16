import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1ZHND5cJc9PS2vYBWkuOCJPFEMxrBijk",
    authDomain: "bt3103-week-6-1a7c2.firebaseapp.com",
    projectId: "bt3103-week-6-1a7c2",
    storageBucket: "bt3103-week-6-1a7c2.appspot.com",
    messagingSenderId: "125345888254",
    appId: "1:125345888254:web:940e1764e7a9c0c184b2af",
    measurementId: "G-WB1RTD9Y56"
  };



firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;