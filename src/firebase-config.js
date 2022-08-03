// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmzYLxc-07C7Mok0UwRtUkFkmTuyFGxd8",
  authDomain: "fshdq-portofolio.firebaseapp.com",
  projectId: "fshdq-portofolio",
  storageBucket: "fshdq-portofolio.appspot.com",
  messagingSenderId: "1077055741049",
  appId: "1:1077055741049:web:097d3fcfb06820f01e08a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
