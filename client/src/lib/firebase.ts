import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDs08tNV7bUEhGUbWfsehOYXyaz_-Tg_ls",
  authDomain: "diplom-2c29d.firebaseapp.com",
  projectId: "diplom-2c29d",
  storageBucket: "diplom-2c29d.firebasestorage.app",
  messagingSenderId: "996200648736",
  appId: "1:996200648736:web:b8825cf90574a8ad2c6c45",
  measurementId: "G-DP14QP8KJF"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
