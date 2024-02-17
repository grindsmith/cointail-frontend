// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA818pWk3qsVyJw7-QOR6309diGXjv2fRQ",
  authDomain: "cointail-7b094.firebaseapp.com",
  projectId: "cointail-7b094",
  storageBucket: "cointail-7b094.appspot.com",
  messagingSenderId: "1017318781396",
  appId: "1:1017318781396:web:72d693a8dcf2cd9f4b6641",
  measurementId: "G-99P3FCHCZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
const analytics = getAnalytics(app);
export const firestoreDB = getFirestore(app);