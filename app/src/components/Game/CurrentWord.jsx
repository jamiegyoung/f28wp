import React, { useState, useRef, useEffect } from "react";
import removeAllLettersAudio from "./KeyboardMedia/RemoveAll.wav";

const CurrentWord = ({ wordTypedCallback, targetWord }) => {
  const [currentWord, _setCurrentWord] = useState([]);
  const currentWordRef = useRef(currentWord);
  const [, setKeyDownListener] = useState();

  const _setKeyDownListener = (
    currentWordRef,
    setCurrentWord,
    wordTypedCallback
  ) => {
    // if a key is pressed
    return window.addEventListener("keydown", (e) => {
      e.preventDefault()
      // if the key is backspace, it is repeating and the current word length isn't 0
      if (
        e.key === "Backspace" &&
        e.repeat &&
        currentWordRef.current.length !== 0 
      ) {
        // play the audio and remove all the letters from the current word
        setCurrentWord([]);
        new Audio(removeAllLettersAudio).play(); // If Backspace is held, remove the whole string typed in the bar.
        return;
      }

      // if the key is backspace, remove the last character from current word
      if (e.key === "Backspace")
        setCurrentWord(currentWordRef.current.slice(0, -1));

      // if the key is space or enter, callback for the word being completed
      if (e.key === " " || e.key === "Enter") {
        wordTypedCallback(currentWordRef.current);
      }

      // if the current length of the word is 24 or more, don't allow more characters to be added
      if (currentWordRef.current.length > 23) return;

      // if the key pressed is a key on the keyboard
      if (
        "qwertyuiopasdfghjklzxcvbnm".split("").includes(e.key.toLowerCase())
      ) {
        currentWordRef.current.push(e.key.toUpperCase());
        // We will not question it, we will not change it, it simply only works with .slice(0). JavaScript is quite something
        setCurrentWord(currentWordRef.current.slice(0));
        return;
      }
    });
  };

  const setCurrentWord = (word) => {
    currentWordRef.current = word;
    _setCurrentWord(word);
  };

  useEffect(() => {
    setKeyDownListener(
      _setKeyDownListener(currentWordRef, setCurrentWord, wordTypedCallback)
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentWord([]);
  }, [targetWord]);

  return (
    <div
      style={{
        width: "75vw",
        maxWidth: "800px",
        height: "50px",
        backgroundColor: "#121212",
        padding: "0px 10px 10px 10px",
        border: "5px solid #242424",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "50px",
          marginTop: "auto",
          borderBottom: "solid 2px #cccc",
        }}
      >
        <p
          style={{
            width: "100%",
            height: "100%",
            fontSize: "36px",
            margin: "0px",
            color: "white",
            textAlign: "center",
          }}
          className="noselect"
        >
          {/* if the target word exists */}
          {targetWord
              // map each letter to a span and if the letter is correct, make it green, else make it red
            ? currentWord.map((letter, index) => (
                <span
                  style={{
                    color: `${
                      currentWord[index] === targetWord[index]
                        ? "rgb(114 228 93)"
                        : "rgb(255 95 95)"
                    }`,
                  }}
                  key={index}
                >
                  {letter}
                </span>
              ))
            : undefined}
          <span
            style={{
              color: "#565656",
            }}
          >
            {/* if there are not target words, then set the text to NO WORDS YET */}
            {targetWord ? targetWord.slice(currentWord.length) : "NO WORDS YET"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CurrentWord;
