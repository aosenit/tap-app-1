import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import GameActive from "./GameActive";
import Leaderboard from "./LeaderBoard";
import GameOver from "./GameOver";
import { GameStart } from "./GameStart";
import { Zap } from "lucide-react";

const TapGame = () => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [highScores, setHighScores] = useState([
    { name: "trazdev", score: 380, rank: 1 },
    { name: "Oluwaseun", score: 325, rank: 2 },
    { name: "MaRt", score: 302, rank: 3 },

    { name: "Oohhhhhhhjjj", score: 217, rank: 4 },
    { name: "Ohhjay", score: 212, rank: 5 },
  ]);

  const resetGame = () => {
    setGameActive(false);
    setGameOver(false);
    setTimeLeft(30);
    setScore(0);
    setPlayerName("");
  };

  useEffect(() => {
    let timer: any;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameOver(true);
      const newHighScores = [...highScores, { name: playerName, score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
      setHighScores(newHighScores);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            Speed Tap Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!gameActive && !gameOver && (
              <GameStart
                playerName={playerName}
                setPlayerName={setPlayerName}
                startGame={() => setGameActive(true)}
              />
            )}

            {gameActive && (
              <GameActive
                score={score}
                timeLeft={timeLeft}
                handleTap={() => setScore((prev) => prev + 1)}
                cancelGame={resetGame}
              />
            )}
            {gameOver && (
              <GameOver
                playerName={playerName}
                score={score}
                resetGame={resetGame}
                isOpen={gameOver}
                onClose={() => setGameOver(false)}
              />
            )}
            <Leaderboard
              show={showLeaderboard}
              toggle={() => setShowLeaderboard(!showLeaderboard)}
              highScores={highScores}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TapGame;
