import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn as firebaseSignIn } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import { SignInUser } from "@/type/User";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ email, password }: SignInUser) => {
      const response = await firebaseSignIn(email, password);

      if (response?.user) {
        navigate("/");
      }

      return response?.user;
    },
    onError: (error) => {
      console.log(error?.message);
      setError("Wrong login credentials");
    },
  });

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        {error.length > 0 && (
          <div className="shadow  p-5 mb-4 text-center bg-red-400 text-white rounded-lg">
            <h2 className="text-lg">{error}</h2>
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Sign In
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

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {mutation.isPending ? "Signing in" : " Sign In"}
        </Button>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
