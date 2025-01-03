import { fetchLeaderboard } from "@/lib/helper";
import { Crown, Medal, Star, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MainLayout from "./MainLayout";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const getMedalIcon = (rank: number) => {
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

const Leaderboard = () => {
  const [highScores, setHighScores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await fetchLeaderboard();
      // Sort scores in descending order and assign ranks
      const sortedScores = data
        .sort((a: any, b: any) => b.score - a.score)
        .map((entry: any, index: number) => ({ ...entry, rank: index + 1 }));
      setHighScores(sortedScores);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchLeaderboard();
  }, []);

  return (
    <MainLayout>
      <div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Leaderboard Champions
            </h3>
            <Link to={"/"} className="text-blue-500">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full w-full">
                Lets' Tap
              </Button>
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            highScores.map((entry: any) => (
              <div
                key={entry.name}
                className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 transform hover:scale-102 transition-all hover:shadow-md"
              >
                <div className="flex-shrink-0 mr-4">
                  {getMedalIcon(entry.rank)}
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-lg">{entry.name}</div>
                  <div className="text-sm text-gray-600">
                    Rank #{entry.rank}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-bold text-blue-600">
                    {entry.score}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
