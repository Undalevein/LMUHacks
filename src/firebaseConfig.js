import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAckB8Q1vJsN1P-1aWEdHEZQK6lGRzr9to",
  authDomain: "neighborly-72025.firebaseapp.com",
  projectId: "neighborly-72025",
  storageBucket: "neighborly-72025.firebasestorage.app",
  messagingSenderId: "5138778060",
  appId: "1:5138778060:web:254034cff65b909480bf69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };