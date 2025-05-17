import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5WIQEj1nusllcJWTYkac0kL5D3o1Nez0",
  authDomain: "malhotratravels-d9803.firebaseapp.com",
  projectId: "malhotratravels-d9803",
  storageBucket: "malhotratravels-d9803.firebasestorage.app",
  messagingSenderId: "4037865259",
  appId: "1:4037865259:web:d82822e02bcd1bc7d99f6e"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); 
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db, googleProvider };
