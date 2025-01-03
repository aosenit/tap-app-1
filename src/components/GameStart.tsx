import { Button } from "@/components/ui/button";

import { useAuthQuery } from "@/hooks/useAuthQuery";
import { extractUsername } from "@/lib/helper";
import { Link } from "react-router-dom";

export const GameStart = ({ startGame }: any) => {
  const { data: user, isLoading } = useAuthQuery();
  const name = user?.email ? extractUsername(user?.email) : "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between mb-6">
        <h3 className="">
          <p>
            <span className="text-lg text-gray-600 uppercase font-bold">
              {extractUsername(name)}
            </span>
          </p>
        </h3>
        <Link to="/leaderboard">
          <Button className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white px-6 py-2 rounded-full w-full">
            Agba Tappers
          </Button>
        </Link>
      </div>
      <Button
        onClick={startGame}
        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full w-full"
      >
        Tap It
      </Button>
    </div>
  );
};
