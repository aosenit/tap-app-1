import { useState, useEffect } from "react";

import GameActive from "./GameActive";

import GameOver from "./GameOver";
import { GameStart } from "./GameStart";

import { useAuthQuery } from "@/hooks/useAuthQuery";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import Loader from "./Loader";

const TapGame = () => {
  const { isLoading } = useAuthQuery();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const resetGame = () => {
    setGameActive(false);
    setGameOver(false);
    setTimeLeft(30);
    setScore(0);
    setPlayerName("");
  };

  const goToLeaderBoard = () => {
    navigate("/leaderboard");
  };

  useEffect(() => {
    let timer: any;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameOver(true);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <MainLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {!gameActive && !gameOver && (
            <GameStart startGame={() => setGameActive(true)} />
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
          <Button
            onClick={goToLeaderBoard}
            className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white px-6 py-2 rounded-full w-full"
          >
            Agba Tappers
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default TapGame;
