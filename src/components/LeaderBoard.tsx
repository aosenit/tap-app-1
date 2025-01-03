import { Button } from "@/components/ui/button";
import { Crown, Medal, Star, Trophy, Zap } from "lucide-react";

const getMedalIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <Star className="h-6 w-6 text-blue-400" />;
  }
};

const Leaderboard = ({ show, toggle, highScores }) => (
  <div>
    <Button
      onClick={toggle}
      className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white px-6 py-2 rounded-full w-full"
    >
      {show ? "Hide Leaderboard" : "Show Leaderboard"}
    </Button>
    {show && (
      <div className="mt-4 space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Leaderboard Champions
        </h3>
        {highScores.map((entry, index) => (
          <div
            key={index}
            className="flex items-center  p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 transform hover:scale-102 transition-all hover:shadow-md"
          >
            <div className="flex-shrink-0 mr-4">{getMedalIcon(entry.rank)}</div>
            <div className="flex-grow">
              <div className="font-bold text-lg">{entry.name}</div>
              <div className="text-sm text-gray-600">Rank #{entry.rank}</div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-lg font-bold text-blue-600">
                {entry.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Leaderboard;
