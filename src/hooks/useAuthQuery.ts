import { auth } from "@/lib/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export type User = FirebaseUser | null;

const fetchAuthState = (): Promise<User> =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user || null);
    });
  });

export const useAuthQuery = () => {
  return useQuery<User>({ queryKey: ["authState"], queryFn: fetchAuthState });
};
