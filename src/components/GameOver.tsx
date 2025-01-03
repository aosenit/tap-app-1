import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import {
  extractUsername,
  getUserLeaderboardDetail,
  saveScore,
} from "@/lib/helper";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import clapSound from "@/assets/clap.mp3";

function GameOver({ score, resetGame, isOpen, onClose }: any) {
  const { width, height } = useWindowSize();
  const { data: user } = useAuthQuery();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sound, setSound] = useState<HTMLAudioElement | null>(null);
  const name = extractUsername(user?.email);

  const playSound = () => {
    const tapSound = new Audio(clapSound);
    setSound(tapSound);
    tapSound.play();
  };

  const stopSound = () => {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  const handleSaveScore = async () => {
    setLoading(true);
    try {
      await saveScore(name, score);
      const res = await getUserLeaderboardDetail(name);
      if (!res.success) return;

      if (res?.data?.score < score) {
        setShowConfetti(true);
        playSound();
        setTimeout(() => {
          setShowConfetti(false);
          stopSound();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!score) return;
    handleSaveScore();
  }, [score]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-yellow-600 text-2xl font-bold">
            Game Over!
          </DialogTitle>
          <DialogDescription>
            <span className="block text-lg mt-2">Well played, {name}!</span>
            <span className="block text-lg font-bold mt-2">
              Final Score: {score}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <Button
            disabled={loading}
            onClick={resetGame}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full"
          >
            {loading ? "Updating Score..." : "Play Again"}
          </Button>
        </div>
        {showConfetti && <Confetti width={width} height={height} />}
      </DialogContent>
    </Dialog>
  );
}

export default GameOver;
