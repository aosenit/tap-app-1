import { auth } from "@/lib/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";

const fetchAuthState = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user || null);
    });
  });

export const useAuthQuery = () => {
  return useQuery({ queryKey: ["authState"], queryFn: fetchAuthState });
};
