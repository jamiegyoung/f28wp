import React from "react";
import { useEffect } from "react";
import GameKeyboardRow from "./GameKeyboardRow";
import getKeyboardSound from "./getKeyboardSound";

const GameKeyboard = () => {
  // the rows on a standard qwerty keyboard
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  // on mount of the component
  useEffect(() => {
    // when a key is pressed
    window.addEventListener("keydown", (e) => {
      // if the key is repeated (held) just return as it will spam the sound
      if (e.repeat) return;
      // backspace and enter are special cases and therefore need to be handled manually
      if (e.key === "Backspace" || e.key === "Enter")
        getKeyboardSound("down").play();
      // if the key is space, the class will be wrong so fix it
      const keyPressed = e.key === " " ? "SPACE" : e.key.toUpperCase();
      // reference the key with the key pressed as an id
      const key = document.getElementById(`key-${keyPressed}`);
      // if the key doesn't exist then stop here
      if (!key) return;
      // make the key smaller
      key.style.transform = "scale(0.85)";
      // play the keyboard down sound
      getKeyboardSound("down").play();
    });

    window.addEventListener("keyup", (e) => {
      // if the key is repeated (held) just return as it will spam the sound
      if (e.repeat) return;
      // backspace and enter are special cases and therefore need to be handled manually
      if (e.key === "Backspace" || e.key === "Enter")
        getKeyboardSound("up").play();
      // if the key is space, the class will be wrong so fix it
      const keyPressed = e.key === " " ? "SPACE" : e.key.toUpperCase();
      // reference the key with the key pressed as an id
      const key = document.getElementById(`key-${keyPressed}`);
      // if the key doesn't exist then stop here
      if (!key) return;
      // make the key smaller
      key.style.transform = "";
      // play the keyboard up sound
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
      {/* for each row in the array */}
      {rows.map((row, index) => (
        // generate a keyboard row
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
              fontSize: "18px",
              margin: "0px 0px 0px 50px",
              height: "110px",
            }}
            className="noselect"
            // can't have " " as a class name so use SPACE instead
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
