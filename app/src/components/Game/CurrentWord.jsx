import React, { useState, useRef, useEffect } from "react";

const CurrentWord = (props) => {
  const [currentWord, _setCurrentWord] = useState("SUP");
  const currentWordRef = useRef(currentWord);

  const setCurrentWord = (word) => {
    currentWordRef.current = word;
    _setCurrentWord(word);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        setCurrentWord(currentWordRef.current.slice(0, -1));
      }

      if (currentWordRef.current.length > 23) return;
      
      if (
        "qwertyuiopasdfghjklzxcvbnm".split("").includes(e.key.toLowerCase())
      ) {
        setCurrentWord(currentWordRef.current + e.key.toUpperCase());
      }
    });
  }, []);

  return (
    <div
      style={{
        width: "75vw",
        maxWidth: "800px",
        height: "75px",
        backgroundColor: "#121212",
        padding: "0px 10px 10px 10px",
        border: "5px solid #242424",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "75px",
          marginTop: "auto",
          borderBottom: "solid 2px #cccc",
        }}
      >
        <p
          style={{
            width: "100%",
            height: "100%",
            fontSize: "48px",
            margin: "0px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          {currentWord.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default CurrentWord;
