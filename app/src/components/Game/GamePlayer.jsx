import React from "react";

const GamePlayer = ({ isPlayer, collapsed }) => {
  console.log(collapsed);
  return (
    <pre
      style={{
        color: "#eeee",
        fontSize: "20px",
        lineHeight: "15px",
        margin: `${isPlayer ? "0px 50px 0px 0px" : "0px 2px"}`,
      }}
    >
      {isPlayer
        ? `o
^/
^`
        : ` o
\\^
 ^`}
    </pre>
  );
};

export default GamePlayer;
