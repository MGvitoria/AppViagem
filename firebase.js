import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}); 

export const db = getFirestore(app);
export default app;