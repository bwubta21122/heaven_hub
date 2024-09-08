// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //import.meta.env.VITE_FIREBASE_API_KEY
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "heaven-hub-8cb28.firebaseapp.com",
  projectId: "heaven-hub-8cb28",
  storageBucket: "heaven-hub-8cb28.appspot.com",
  messagingSenderId: "82253086980",
  appId: "1:82253086980:web:7204c545335780c8b89051"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
