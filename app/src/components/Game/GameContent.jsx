import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import GameBackground from "./GameBackground";
import GameBoss, { bossTypes } from "./GameBoss";
import GamePlatform from "./GamePlatform";
import GameKeyboard from "./GameKeyboard";
import SoundButton from "./SoundButton";
import CurrentWord from "./CurrentWord";
import GameCountdown from "./GameCountdown";
import getHitSound from './getHitSound';
import LogoutButton from "./LogoutButton";

const GameContent = () => {
  const [targetWordIndex, _setTargetWordIndex] = useState(0);
  const targetWordIndexRef = useRef(targetWordIndex);

  const [targetWords, _setTargetWords] = useState([]);
  const targetWordsRef = useRef(targetWords);

  const [socket, setSocket] = useState(null);
  const [wordsCompleted, setWordsCompleted] = useState([]);

  const [bossInfo, setBossInfo] = useState(null);

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
        // console.log(typedWord);
        // const socket = io("http://localhost:30284");
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
      setBossInfo(data);
      // data.name
      // data.health
      // data.experienceWorth
      // data dead
      console.log(data);
    });

    getHitSound();
    socket.emit("message", wordsCompleted[wordsCompleted.length - 1]);
    setWordsCompleted((state) => {
      state.pop();
      return state;
    });
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
            bossInfo
              ? bossTypes[bossInfo.type]
              : bossTypes[Math.floor(Math.random() * bossTypes.length - 1)]
          }
          name={bossInfo ? bossInfo.name : ""}
          health={bossInfo ? bossInfo.health : 25}
          maxHealth={bossInfo ? bossInfo.maxHealth : 25}
          dead={bossInfo ? bossInfo.dead : false}
        ></GameBoss>
        <GamePlatform></GamePlatform>
        <GameCountdown reset={targetWords}></GameCountdown>
        <CurrentWord
          wordTypedCallback={handleWordTyped}
          targetWord={targetWords[targetWordIndex]}
        ></CurrentWord>
        <GameKeyboard></GameKeyboard>
      </div>
      <SoundButton></SoundButton>
      <LogoutButton></LogoutButton>
    </div>
  );
};

export default GameContent;
