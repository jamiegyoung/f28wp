import React from "react";

const GamePlayer = ({ isPlayer, collapsed }) => {
  return (
    <pre
      style={{
        color: "#eeee",
        fontSize: "20px",
        lineHeight: "15px",
        margin: `${isPlayer ? "0px" : "0px 2px"}`,
      }}
    >
      {/* change the direction of the spite depending on if it is a suer or not */}
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
