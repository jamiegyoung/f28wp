import React from "react";

const GameKeyboardRow = ({ row, index }) => { // Below is the ASCII art for the on-screen keyboard with a field key as input to render the correct keys on the keyboard
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
      {row.split("").map((x) => (
        <pre
          style={{
            transition: "all .1s ease-out",
            color: "#cccc",
            fontSize: "20px",
            margin: "0px 2px 0px 0px",
            height: "70px",
            lineHeight: '19px'
          }}
          key={x}
          id={`key-${x}`}
        >
          {generateKey(x)}
        </pre>
      ))}
    </div>
  );
};

export default GameKeyboardRow;
