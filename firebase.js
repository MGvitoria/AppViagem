import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZ_79EcpqHjj77tffCCMbbn2SfRVqSWhQ",
  authDomain: "appviagem-c5b54.firebaseapp.com",
  projectId: "appviagem-c5b54",
  storageBucket: "appviagem-c5b54.firebasestorage.app",
  messagingSenderId: "611154749143",
  appId: "1:611154749143:web:81e262e5315cde485b7292",
  measurementId: "G-G05W7GN7QQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
