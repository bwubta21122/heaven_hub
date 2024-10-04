import { initializeApp } from "firebase/app";
const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "heaven-hub-8cb28.firebaseapp.com",
  projectId: "heaven-hub-8cb28",
  storageBucket: "heaven-hub-8cb28.appspot.com",
  messagingSenderId: "82253086980",
  appId: "1:82253086980:web:7204c545335780c8b89051"
};

export const app = initializeApp(firebaseConfig);
