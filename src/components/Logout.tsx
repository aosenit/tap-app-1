import { getAuth, signOut } from "firebase/auth";
import { Button } from "./ui/button";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const logoutUser = async () => {
    const auth = getAuth();
    setLoading(true);
    try {
      await signOut(auth);
      navigate("/signin");
      console.log("User successfully logged out");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging out:", error.message);
      } else {
        console.error("An unknown error occurred during logout.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={logoutUser}
      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-full"
    >
      {loading ? "Logging out" : "Log Out"}
    </Button>
  );
};