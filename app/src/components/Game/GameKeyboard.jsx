import React from "react";
import { useEffect } from "react";
import GameKeyboardRow from "./GameKeyboardRow";
import getKeyboardSound from "./getKeyboardSound";

const GameKeyboard = () => {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      if (e.key == 'Backspace') getKeyboardSound("down").play();
      const keyPressed = e.key === " " ? "SPACE" : e.key.toUpperCase();
      const key = document.getElementById(`key-${keyPressed}`);
      if (!key) return;
      key.style.transform = "scale(0.85)";
      getKeyboardSound("down").play();
    });

    window.addEventListener("keyup", (e) => {
      if (e.repeat) return;
      if (e.key == 'Backspace') getKeyboardSound("up").play();
      const keyPressed = e.key === " " ? "SPACE" : e.key.toUpperCase();
      const key = document.getElementById(`key-${keyPressed}`);
      if (!key) return;
      key.style.transform = "";
      getKeyboardSound("up").play();
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className="noselect"
    >
      {rows.map((row, index) => (
        <GameKeyboardRow key={index} index={index} row={row}></GameKeyboardRow>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <pre
            style={{
              transition: "all .1s ease-out",
              color: "#cccc",
              fontSize: "20px",
              margin: "0px 0px 0px 50px",
              height: "110px",
            }}
            className="noselect"
            id={`key-SPACE`}
          >
            {` ___________________________________________
| +---------------------------------------+ |
| |                 ATTACK!               | |
| +---------------------------------------+ |
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default GameKeyboard;
