import { initializeApp } from 'firebase/app';
import { getAuth,  signInWithEmailAndPassword, signOut, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4xnF9v3DfcdQ5VYTB9L8W3VvOXMJXx74",
  authDomain: "olx-final-project-c6878.firebaseapp.com",
  projectId: "olx-final-project-c6878",
  storageBucket: "olx-final-project-c6878.appspot.com",
  messagingSenderId: "539722927849",
  appId: "1:539722927849:web:07384c5a33d07f8e2baa78"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
