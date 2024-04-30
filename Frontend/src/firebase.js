// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9kIzJUVjQbTsxcixZX1y56k2FWZivLB4",
  authDomain: "spd-working.firebaseapp.com",
  databaseURL: "https://spd-working-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spd-working",
  storageBucket: "spd-working.appspot.com",
  messagingSenderId: "342709639252",
  appId: "1:342709639252:web:5875d716f35a311806b5c1",
  measurementId: "G-450KSJ495W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, auth, analytics, db };
