import React from "react";

const GameBossHealthBar = ({ max, current }) => {
  return (
    <div>
      {!isNaN(max) && !isNaN(current) ? (
        <pre
          style={{
            color: "red",
            fontSize: "24px",
            margin: "0px",
          }}
        >{`[${Array(Math.ceil(25 * (current / max))).join("❤")}${Array(Math.ceil(25 - (25 * (current / max)))).join(" ")}]`}</pre>
      ) : (
        <pre
          style={{
            color: "red",
            fontSize: "24px",
            margin: "0px",  
          }}
        >{`[${Array(25).join(" ")}]`}</pre>
      )}
    </div>
  );
};

export default GameBossHealthBar;
