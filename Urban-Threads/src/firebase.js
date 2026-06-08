// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getUrbanThreads } from "firebase/urbanThreads";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGjVcWnCrn4KGXvsV1IT1ksj-haGL5Cz0",
  authDomain: "urbanthreads-3e07d.firebaseapp.com",
  projectId: "urbanthreads-3e07d",
  storageBucket: "urbanthreads-3e07d.firebasestorage.app",
  messagingSenderId: "744691757234",
  appId: "1:744691757234:web:c3458ed5295659727d59ab",
  measurementId: "G-8F22NN0LMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getUrbanThreads(app);
const auth = getAuth(app);

export { db, auth };
