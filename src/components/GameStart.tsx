import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useState } from "react";

export const GameStart = ({ playerName, setPlayerName, startGame }: any) => {
  const [name, setName] = useState("");

  const handlePlayerName = () => {
    setPlayerName(name);
    setName("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative w-[90%]">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 py-5 text-lg"
            maxLength={15}
          />
        </div>
        <Button
          onClick={handlePlayerName}
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-full"
        >
          Add
        </Button>
      </div>
      {playerName && (
        <Button
          onClick={startGame}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full w-full"
        >
          Start Game
        </Button>
      )}
    </div>
  );
};
