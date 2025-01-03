import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cleanFirebaseError, signUp as signUpFirebase } from "@/lib/helper";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { SignUpUser } from "@/type/User";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ email, password }: SignUpUser) => {
      const response = await signUpFirebase(email, password);

      navigate("/");
      return response?.user;
    },
    onError: (error) => {
      setError(cleanFirebaseError(error?.message));
    },
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.trim() !== confirmPassword.trim()) {
      toast({ title: "Passwords do not match!" });
      return;
    }
    // Call your Firebase sign-up method here
    mutation.mutate({ email, password });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        {error.length > 0 && (
          <div className="shadow  p-5 mb-4 text-center bg-red-400 text-white rounded-lg">
            <h2 className="text-lg">{error}</h2>
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Sign Up
          </h1>

          <Link to="/leaderboard">
            <Button className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white px-6 py-2 rounded-full w-full">
              Agba Tappers
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your password"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Confirm your password"
          />
        </div>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {mutation.isPending ? "Signing up..." : "Sign Up"}
        </Button>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
