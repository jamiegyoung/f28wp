import React, { useEffect, useState, useRef } from "react";
import { useIdleTimer } from 'react-idle-timer';
import io from "socket.io-client";
import GameBackground from "./GameBackground";
import GameBoss, { bossTypes } from "./GameBoss";
import GamePlatform from "./GamePlatform";
import GameKeyboard from "./GameKeyboard";
import CurrentWord from "./CurrentWord";
import GameCountdown from "./GameCountdown";
import getHitSound from './getHitSound';
import LogoutButton from "./LogoutButton";

const GameContent = () => {
  const [targetWordIndex, _setTargetWordIndex] = useState(0);
  const targetWordIndexRef = useRef(targetWordIndex);

  const handleOnIdle = () => {
    // logout the user after 2 minutes
    window.location.replace('/logout')
  }

  useIdleTimer({
    timeout: 1000 * 60 * 2,
    onIdle: handleOnIdle,
    debounce: 500
  })

  const [targetWords, _setTargetWords] = useState([]);
  const targetWordsRef = useRef(targetWords);

  const [socket, setSocket] = useState(null);
  const [wordsCompleted, setWordsCompleted] = useState([]);

  const [gameInfo, setGameInfo] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);

  const setTargetWords = (newWords) => {
    targetWordsRef.current = newWords;
    _setTargetWords(newWords);
  };

  const setTargetWordIndex = (newIndex) => {
    targetWordIndexRef.current = newIndex;
    _setTargetWordIndex(newIndex);
  };

  const handleWordTyped = (e) => {
    const currentTargetWord =
      targetWordsRef.current[targetWordIndexRef.current];
    if (currentTargetWord && e) {
      const typedWord = e.join("").toUpperCase();
      // Client side checking for if it is the correct word (there will also be server side)
      if (currentTargetWord.toUpperCase() == typedWord) {
        setTargetWordIndex(targetWordIndexRef.current + 1);
        setWordsCompleted((state) => [...state, typedWord]);
      }
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => console.log("connected"));
    socket.on("sentence", (data) => {
      if (data && data.length > 7) {
        setTargetWords(data);
      }
    });

    socket.on("gameInfo", (data) => {
      setGameInfo(data);
      // name: this.boss.name,
      // health: this.boss.health,
      // maxHealth: this.boss.initialHealth,
      // experienceWorth: this.boss.experienceGiven,
      // dead: this.boss.dead,
      // type: this.boss.type,
      // numOtherPlayers: this.uniquePlayers.length
    });

    socket.on("playerInfo", (data) => {
      setPlayerInfo(data);
    })

    if(wordsCompleted[wordsCompleted.length - 1]) {
      getHitSound();
      socket.emit("message", wordsCompleted[wordsCompleted.length - 1]);
      setWordsCompleted((state) => {
        state.pop();
        return state;
      });

    }
  }, [socket, wordsCompleted]);

  useEffect(() => {
    setTargetWordIndex(0);
  }, [targetWords]);

  useEffect(() => {
    setSocket(io());
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
        <GameBoss
          bossType={
            gameInfo
              ? bossTypes[gameInfo.type]
              : bossTypes[Math.floor(Math.random() * bossTypes.length)]
          }
          name={gameInfo ? gameInfo.name : ""}
          health={gameInfo ? gameInfo.health : 25}
          maxHealth={gameInfo ? gameInfo.maxHealth : 25}
          dead={gameInfo ? gameInfo.dead : false}
          numPlayers={gameInfo ? gameInfo.numOtherPlayers : 0}
          level={playerInfo ? playerInfo.level : 0}
          // numPlayers={1000}
        ></GameBoss>
        <GamePlatform></GamePlatform>
        <GameCountdown reset={targetWords}></GameCountdown>
        <CurrentWord
          wordTypedCallback={handleWordTyped}
          targetWord={targetWords[targetWordIndex]}
        ></CurrentWord>
        <GameKeyboard></GameKeyboard>
      </div>
      <LogoutButton></LogoutButton>
    </div>
  );
};

export default GameContent;
