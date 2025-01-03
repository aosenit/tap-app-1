import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { analytics, auth, db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { User } from "@/type/User";
import { logEvent } from "firebase/analytics";

// Sign up
export const signUp = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res;
};

// Sign in
export const signIn = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

//save score

export const saveScore = async (user: User, score: number) => {
  const res = await addDoc(collection(db, "leaderboard"), {
    name: user.name,
    score,
    createdAt: new Date(),
  });
  return res;
};

//fetch leaderboard
export const fetchLeaderboard = async () => {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, orderBy("score", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

//track event
export const trackEvent = (eventName: string, params: any) => {
  logEvent(analytics, eventName, params);
};
