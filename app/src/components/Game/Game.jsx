import React from "react";
import GameUserManager from "./GameUserManager";
import GameContent from "./GameContent";

const Game = () => {
  // By wrapping the game in a game user manager, a user cannot be in the game without a valid ID
  return (
    <GameUserManager>
      <GameContent></GameContent>
    </GameUserManager>
  );
};

export default Game;
