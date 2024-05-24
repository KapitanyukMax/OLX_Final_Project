import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "olx-final-project-c6878.firebaseapp.com",
  projectId: "olx-final-project-c6878",
  storageBucket: "olx-final-project-c6878.appspot.com",
  messagingSenderId: "539722927849",
  appId: "1:539722927849:web:07384c5a33d07f8e2baa78"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const googleAuthProvider = new GoogleAuthProvider();