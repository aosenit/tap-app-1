import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { analytics, auth, db } from "./firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { logEvent } from "firebase/analytics";
import { redirect } from "react-router-dom";

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

export const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);

    redirect("/signin");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging out:", error.message);
    } else {
      console.error("An unknown error occurred during logout.");
    }
  }
};

//save score

export const saveScore = async (name: string, score: number) => {
  const leaderboardRef = collection(db, "leaderboard");
  const userDocRef = doc(leaderboardRef, name); // Use `name` as the document ID

  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Update score only if the new score is higher
      const existingScore = userDoc.data().score;
      if (score > existingScore) {
        await updateDoc(userDocRef, { score, updatedAt: new Date() });
      }
    } else {
      // Create a new document for the user
      await setDoc(userDocRef, { name, score, createdAt: new Date() });
    }

    return { success: true, message: "Score saved or updated successfully" };
  } catch (error) {
    console.error("Error saving/updating score:", error);
    return { success: false, message: "Error saving score" };
  }
};

//fetch leaderboard
export const fetchLeaderboard = async () => {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, orderBy("score", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

//fetch user leaderboard
export const getUserLeaderboardDetail = async (name: string) => {
  const leaderboardRef = collection(db, "leaderboard");
  const userDocRef = doc(leaderboardRef, name);

  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, message: "User not found in leaderboard" };
    }
  } catch (error) {
    console.error("Error fetching user leaderboard detail:", error);
    return { success: false, message: "Error fetching leaderboard details" };
  }
};

//track event
export const trackEvent = (eventName: string, params: any) => {
  logEvent(analytics, eventName, params);
};

export function extractUsername(email: string) {
  if (typeof email !== "string") {
    return email;
  }
  const atIndex = email.indexOf("@");
  return email?.substring(0, atIndex) || email;
}
