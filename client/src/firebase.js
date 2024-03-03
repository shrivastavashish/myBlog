// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "myblog-1c0e6.firebaseapp.com",
  projectId: "myblog-1c0e6",
  storageBucket: "myblog-1c0e6.appspot.com",
  messagingSenderId: "634815704328",
  appId: "1:634815704328:web:8180c1abeb18df4eae90bd"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);


