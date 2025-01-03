import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { extractUsername, saveScore } from "@/lib/helper";
import { useEffect, useState } from "react";

function GameOver({ score, resetGame, isOpen, onClose }: any) {
  const { data: user } = useAuthQuery();
  const [loading, setLoading] = useState(false);

  const name = user?.email ? extractUsername(user?.email) : "";

  const handleSaveScore = async () => {
    setLoading(true);
    try {
      await saveScore(name, score);
    } catch (error) {
      console.error("Error saving score:", error);
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
      </DialogContent>
    </Dialog>
  );
}

export default GameOver;
