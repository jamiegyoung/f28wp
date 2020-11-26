import React from "react";

const GameBossHealthBar = ({ max, current }) => {
  return (
    <div>
      {/* if the health bar has a max and current */}
      {!isNaN(max) && !isNaN(current) ? (
        <pre
          style={{
            color: "red",
            fontSize: "24px",
            margin: "0px",
          }}
          // generate 25 characters, which represent the health bar of the monster
          // this calculation seems to be a bit off, can be fixed later
        >{`[${Array(Math.ceil(25 * (current / max))).join("❤")}${Array(Math.ceil(25 - (25 * (current / max)))).join("  ")}]`}</pre>
      ) : (
        <pre
          style={{
            color: "red",
            fontSize: "24px",
            margin: "0px",  
          }}
          // just return an empty health bar
        >{`[${Array(25).join("  ")}]`}</pre>
      )}
    </div>
  );
};

export default GameBossHealthBar;
