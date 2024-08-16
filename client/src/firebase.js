// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-5557d.firebaseapp.com",
  projectId: "mern-auth-5557d",
  storageBucket: "mern-auth-5557d.appspot.com",
  messagingSenderId: "891506126765",
  appId: "1:891506126765:web:b82b29032598b5bf1f7b24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);