// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjdCuHhft8LghQrgZjoFf9yDyAfaBAHzE",
  authDomain: "netflix-gpt-51e84.firebaseapp.com",
  projectId: "netflix-gpt-51e84",
  storageBucket: "netflix-gpt-51e84.appspot.com",
  messagingSenderId: "1043793674404",
  appId: "1:1043793674404:web:48d5755011262bd8ace631",
  measurementId: "G-9SPW9K2B2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);