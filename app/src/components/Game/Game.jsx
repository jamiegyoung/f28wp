import React from "react";
import GameContent from "./GameContent";
import SoundButton from "./SoundButton";

const Game = () => {
  return (
    <div className="noselect">
      <GameContent></GameContent>
      <SoundButton></SoundButton>
    </div>
  );
};

export default Game;
