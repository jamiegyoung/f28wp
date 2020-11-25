import React from "react";

const GameKeyboardRow = ({ row, index }) => {
  const generateKey = (key) =>
    ` _____
|+---+|
|| ${key} ||
|+---+|
 ‾‾‾‾‾`;

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
            fontSize: "18px",
            margin: "0px 2px 0px 0px",
            height: "80px",
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
