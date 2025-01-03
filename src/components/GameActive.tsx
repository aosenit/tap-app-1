import { Button } from "@/components/ui/button";
import { Timer, History } from "lucide-react";
import tapSoundMp3 from "@/assets/tap.mp3";

const GameActive = ({ score, timeLeft, handleTap, cancelGame }) => {
  const playSound = () => {
    const tapSound = new Audio(tapSoundMp3);
    tapSound.play();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-red-500" />
          <span>{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-blue-500" />
          <span>{score}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          handleTap();
          playSound();
        }}
        className="w-full h-48"
      >
        TAP!
      </Button>
      <Button
        onClick={cancelGame}
        className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-6 py-2 rounded-full"
      >
        Cancel Game
      </Button>
    </div>
  );
};

export default GameActive;
