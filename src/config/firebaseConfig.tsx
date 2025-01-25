// firebaseconfig.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4OZNqons7-yqMPMbtCo-Ija25OfYs02w",
  authDomain: "prospectlog-6fe01.firebaseapp.com",
  projectId: "prospectlog-6fe01",
  storageBucket: "prospectlog-6fe01.firebasestorage.app",
  messagingSenderId: "840759062258",
  appId: "1:840759062258:web:bed6a101436675e9272a6b",
  measurementId: "G-2ZJZJ6MQD5"
};


// Initialisation de Firebase si aucune app n'existe déjà
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app); // Initialise Auth avec l'instance app
export const db = getFirestore(app); // Initialise Firestore
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);



