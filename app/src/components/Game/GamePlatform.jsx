import React from "react";
import { useEffect } from 'react';
import { useState } from 'react';

const GamePlatform = () => {
  const calcWidth = () => {
    const count = Math.floor(window.innerWidth / 22);
    if (count < 20) {
      return 20
    }
    if (count > 60) {
      return 60
    }
    return count;
  };
  
  const [widthCount, setWidthCount] = useState(calcWidth)
  useEffect(() => {
    window.addEventListener("resize", () => setWidthCount(calcWidth));
  })
  return (
    <pre
      style={{
        textAlign: "center",
        fontSize: "24px",
        color: "#eeee",
        marginTop: "0px",
      }}
    >
      {`${Array(widthCount).join("#")}`}
    </pre>
  );
};

export default GamePlatform;
