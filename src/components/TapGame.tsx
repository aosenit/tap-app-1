import { useState, useEffect, useRef } from "react";

import GameActive from "./GameActive";

import GameOver from "./GameOver";
import { GameStart } from "./GameStart";

import { useAuthQuery } from "@/hooks/useAuthQuery";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import Loader from "./Loader";
import { extractUsername, getUserLeaderboardDetail } from "@/lib/helper";
import clapSound from "@/assets/clap.mp3";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Logout } from "./Logout";

const TapGame = () => {
  const { isLoading } = useAuthQuery();
  const { data: user } = useAuthQuery();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const name = user?.email ? extractUsername(user?.email) : "";
  const isPlayingRef = useRef(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { width, height } = useWindowSize();

  // Initialize audio object
  useEffect(() => {
    const audio = new Audio(clapSound);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio error:", err));
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setGameOver(false);
    setTimeLeft(30);
    setScore(0);
  };

  const player = () => {
    if (isPlayingRef.current) return; // Prevent overlapping
    isPlayingRef.current = true;

    setShowConfetti(true);
    playSound();

    setTimeout(() => {
      setShowConfetti(false);
      stopSound();
      isPlayingRef.current = false;
    }, 5000);
  };

  const handleApplause = async () => {
    const res = await getUserLeaderboardDetail(name);
    if (!res.success) return;

    if (!res?.data?.score || res?.data?.score < score) {
      player();
    }
  };

  useEffect(() => {
    let timer: any;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      handleApplause();
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
              score={score}
              resetGame={resetGame}
              isOpen={gameOver}
              onClose={() => setGameOver(false)}
            />
          )}
          <Logout />
          {showConfetti && <Confetti width={width} height={height} />}
        </div>
      )}
    </MainLayout>
  );
};

export default TapGame;
