import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZKAS0FKdEVcrwqmcJGc9UfL28YJZOaSk",
  authDomain: "grupo3d-3b314.firebaseapp.com",
  projectId: "grupo3d-3b314",
  storageBucket: "grupo3d-3b314.firebasestorage.app",
  messagingSenderId: "954607438706",
  appId: "1:954607438706:web:f51bbbe4dd38ff95946beb",
  measurementId: "G-ZQWQMLHB4M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);