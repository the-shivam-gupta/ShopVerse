import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5NVJoVLe__PxxT7y8BuSzRqdPQr9GfWw",
  authDomain: "shopverse-516b8.firebaseapp.com",
  projectId: "shopverse-516b8",
  storageBucket: "shopverse-516b8.firebasestorage.app",
  messagingSenderId: "553646473158",
  appId: "1:553646473158:web:ae6552e0a34f902cbbbcc7",
  measurementId: "G-862GNX7HEL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db =  getFirestore(app);
  