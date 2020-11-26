import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const GamePlatform = () => {
  // generate the width of the platform based off the window
  const calcWidth = () => {
    const count = Math.floor(window.innerWidth / 22);
    // clamp it so that it can't be smaller than 60 characters
    if (count < 60) {
      return 60;
    }
    return count;
  };

  const [widthCount, setWidthCount] = useState(calcWidth);

  useEffect(() => {
    // when the window is resized,
    window.addEventListener("resize", () => setWidthCount(calcWidth));
  }, []);

  return (
    <pre
      style={{
        textAlign: "center",
        fontSize: "18px",
        color: "#eeee",
        margin: "2px 0 0 0",
        lineHeight: "10px",
      }}
    >
      {/* generate a line of # */}
      {`${Array(widthCount).join("#")}`}
    </pre>
  );
};

export default GamePlatform;
