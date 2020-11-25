import React from "react";
import GameContent from "./GameContent";

const Game = () => {
  // By wrapping the game in a game user manager, a user cannot be in the game without a valid ID
  // <GameUserManager>
  // {/* </GameUserManager> */}
  return (
      <GameContent></GameContent>
  );
};

export default Game;
