import React from "react";

const GameKeyboardRow = ({ row, index }) => { // Below is the ASCII art for the on-screen keyboard with a parameter key as input to render the correct keys on the keyboard
  const generateKey = (key) =>
    ` _____
|+---+|
|| ${key} ||
|+---+|
 ‾‾‾‾‾`;
// Render the styling for the buttons
  return (
    <div
      style={{
        display: "flex",
        marginLeft: index * 40,
      }}
    >
      {/* for each letter in the row (e.g "QWERTYUIOP") generate ascii art with the id as key-{x}*/}
      {row.split("").map((x) => (
        <pre
          style={{
            transition: "all .1s ease-out",
            color: "#cccc",
            fontSize: "20px",
            margin: "0px 2px 0px 0px",
            height: "70px",
            lineHeight: "19px",
          }}
          key={x}
          // this allows for referencing later when performing css changes
          id={`key-${x}`}
        >
          {/* generate the key ascii */}
          {generateKey(x)}
        </pre>
      ))}
    </div>
  );
};

export default GameKeyboardRow;
