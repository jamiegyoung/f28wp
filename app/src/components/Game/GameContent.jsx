import React, { useEffect, useState, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import io from "socket.io-client";
import GameBoss, { bossTypes } from "./GameBoss";
import GamePlatform from "./GamePlatform";
import GameKeyboard from "./GameKeyboard";
import CurrentWord from "./CurrentWord";
import GameCountdown from "./GameCountdown";
import getHitSound from "./getHitSound";
import LogoutButton from "./LogoutButton";

const GameContent = () => {
  // target word index for which word the user is on in the sentence
  const [targetWordIndex, _setTargetWordIndex] = useState(0);
  // a reference to the target word index
  const targetWordIndexRef = useRef(targetWordIndex);

  // If the user is idle
  const handleOnIdle = () => {
    // logout the user after 2 minutes
    window.location.replace("/logout");
  };

  // Idle timer
  useIdleTimer({
    timeout: 1000 * 60 * 2,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  // target words that the user has to write
  const [targetWords, _setTargetWords] = useState([]);
  const targetWordsRef = useRef(targetWords);

  // the socket that the user is connected to the server with
  const [socket, setSocket] = useState(null);
  const [wordsCompleted, setWordsCompleted] = useState([]);

  // the current information about the game (boss status, etc)
  const [gameInfo, setGameInfo] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);

  // custom handler for set target words to also change the reference
  const setTargetWords = (newWords) => {
    targetWordsRef.current = newWords;
    _setTargetWords(newWords);
  };

  // custom handler for set target words index to also change the reference
  const setTargetWordIndex = (newIndex) => {
    targetWordIndexRef.current = newIndex;
    _setTargetWordIndex(newIndex);
  };

  // when a word is sent to this component from the current word input
  const handleWordTyped = (e) => {
    // get the current target word based on the array and the current index
    const currentTargetWord =
      targetWordsRef.current[targetWordIndexRef.current];
    // if both targetword and e exist
    if (currentTargetWord && e) {
      const typedWord = e.join("").toUpperCase();
      // if e (the word typed) and the current target word are the same,
      if (currentTargetWord.toUpperCase() === typedWord) {
        // increase the current target word index to point to the next word
        setTargetWordIndex(targetWordIndexRef.current + 1);
        //  append the completed word to the words completed array
        setWordsCompleted((state) => [...state, typedWord]);
      }
    }
  };

  useEffect(() => {
    // if the user has no socket, we do not need to enter this function
    if (!socket) return;
    // on client connect, log the fact that it has connected to the server
    socket.on("connect", () => console.log("connected to server"));

    // when the socket receives a sentence
    socket.on("sentence", (data) => {
      // if there is data, and the data length is more than 7
      if (data && data.length > 7) {
        // set the target words as the data received
        setTargetWords(data);
      }
    });

    // on receiving the game info
    socket.on("gameInfo", (data) => {
      // set the received data as the game info
      setGameInfo(data);
      // This is expected structure for data:
      // name: this.boss.name,
      // health: this.boss.health,
      // maxHealth: this.boss.initialHealth,
      // experienceWorth: this.boss.experienceGiven,
      // dead: this.boss.dead,
      // type: this.boss.type,
      // numOtherPlayers: this.uniquePlayers.length
    });

    // when player info is received
    socket.on("playerInfo", (data) => {
      // set it as the player info
      setPlayerInfo(data);
    });

    // if there is a word in the words completed array
    if (wordsCompleted[wordsCompleted.length - 1]) {
      // make a hit sound as the user has hit the monster
      getHitSound();
      // tell the server the word has been completed
      socket.emit("message", wordsCompleted[wordsCompleted.length - 1]);
      // remove the word from words completed
      setWordsCompleted((state) => {
        state.pop(); // Pop completed words from list.
        return state;
      });
    }
    // this effect will be triggered on the change of socket or words completed
  }, [socket, wordsCompleted]);

  // if the target words are changed, reset the index to 0
  useEffect(() => {
    setTargetWordIndex(0);
  }, [targetWords]);

  // set the socket when this component is mounted
  useEffect(() => {
    setSocket(io());
  }, []);

  return (
    <div>
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
            // if the game info exists, set the type to the boss sent, else set it to the question mark
            gameInfo ? bossTypes[gameInfo.type] : bossTypes[0]
          }
          // Conditionals: assign values of gameInfo to current Boss. If they don't exist, set a default value.
          name={gameInfo ? gameInfo.name : ""}
          health={gameInfo ? gameInfo.health : 25}
          // set the max health of the boss
          maxHealth={gameInfo ? gameInfo.maxHealth : 25}
          // set if the boss is dead or not
          dead={gameInfo ? gameInfo.dead : false}
          // set the current number of players in the game
          numPlayers={gameInfo ? gameInfo.numOtherPlayers : 0}
          // set the current level of the player
          level={playerInfo ? playerInfo.level : 0}
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
