import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHvfVtb2mVj6dmBD8JVZiqnWJrNWlILcI",
  authDomain: "nursinginformatics-onlinetest.firebaseapp.com",
  projectId: "nursinginformatics-onlinetest",
  storageBucket: "nursinginformatics-onlinetest.firebasestorage.app",
  messagingSenderId: "654445598782",
  appId: "1:654445598782:web:0bced050d68887a0ea196f",
  measurementId: "G-XM37DG77XW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
