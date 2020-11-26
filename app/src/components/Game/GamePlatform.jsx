import React from "react";
import { useEffect } from 'react';
import { useState } from 'react';

const GamePlatform = () => {
  const calcWidth = () => {
    const count = Math.floor(window.innerWidth / 22);
    if (count < 60) {
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
        fontSize: "18px",
        color: "#eeee",
        margin: "2px 0 0 0",
        lineHeight: '10px'
      }}
    >
      {`${Array(widthCount).join("#")}`}
    </pre>
  );
};

export default GamePlatform;
