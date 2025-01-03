import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const GameOver = ({ playerName, score, resetGame, isOpen, onClose }: any) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-yellow-600 text-2xl font-bold">
          Game Over!
        </DialogTitle>
        <DialogDescription>
          <span className="block text-lg mt-2">Well played, {playerName}!</span>
          <span className="block text-lg font-bold mt-2">
            Final Score: {score}
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center mt-6">
        <Button
          onClick={resetGame}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full"
        >
          Play Again
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default GameOver;
