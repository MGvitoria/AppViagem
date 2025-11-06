import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyAbtI_6wJECzzTy0WiZjmj8KlfAznRy6cw",
  authDomain: "appviagem-d38bf.firebaseapp.com",
  projectId: "appviagem-d38bf",
  storageBucket: "appviagem-d38bf.appspot.com", // 🔥 corrigido aqui!
  messagingSenderId: "91219542511",
  appId: "1:91219542511:web:f490e56e434c8c0df7b61a"
};

console.log('App Firebase inicializado:', app.name);
console.log('Auth configurado:', auth.app.options);

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
