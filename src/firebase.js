import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5ZBbYWbnPU8-7_L48g5daaxKj6EcgT3g",
  authDomain: "auth-63417.firebaseapp.com",
  databaseURL: "http://auth-63417.firebaseio.com",
  projectId: "auth-63417",
  storageBucket: "auth-63417.appspot.com",
  messagingSenderId: "394723892506",
  appId: "1:394723892506:web:97f1c9e9c56fd896a7e0a3",
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
