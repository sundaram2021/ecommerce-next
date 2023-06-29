// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1d18Pb8RpbIf_ezKFTYN1Kgmvsot535Y",
  authDomain: "e-commerce-4662e.firebaseapp.com",
  projectId: "e-commerce-4662e",
  storageBucket: "e-commerce-4662e.appspot.com",
  messagingSenderId: "444071524163",
  appId: "1:444071524163:web:2b9825ba2fe214f85a61f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);