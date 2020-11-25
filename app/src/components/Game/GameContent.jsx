import React, { useEffect } from "react";
import io from "socket.io-client";
import GameBackground from "./GameBackground";
import GameBoss from "./GameBoss";
import GamePlatform from "./GamePlatform";
import GameKeyboard from "./GameKeyboard";
import SoundButton from './SoundButton';
import CurrentWord from './CurrentWord';

const GameContent = () => {
  useEffect(() => {
    const socket = io("http://localhost:30284");
    socket.on("connect", () => console.log("connected"));
    socket.on("sentence", (data) => console.log(data));
  }, []);

  return (
    <div>
      <GameBackground></GameBackground>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          flexDirection: "column",
        }}
      >
        
        <GameBoss></GameBoss>
        <GamePlatform></GamePlatform>
        <CurrentWord value=""></CurrentWord>
        <GameKeyboard></GameKeyboard>
      </div>
      <SoundButton></SoundButton>
    </div>
  );
};

export default GameContent;
