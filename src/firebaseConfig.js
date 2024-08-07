// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_KEY,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_KEY,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_KEY,
  appId: process.env.REACT_APP_FIREBASE_APPID_KEY,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID_KEY,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
};
