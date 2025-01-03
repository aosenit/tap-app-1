import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlkp1TgJwX1qDP7bZ5WR-hIhKiXd5Je0c",
  authDomain: "agba-tapper.firebaseapp.com",
  projectId: "agba-tapper",
  storageBucket: "agba-tapper.firebasestorage.app",
  messagingSenderId: "545878084768",
  appId: "1:545878084768:web:6959124fe266d457d88dc5",
  measurementId: "G-SDYE1Z0NFW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { analytics, auth, db };
