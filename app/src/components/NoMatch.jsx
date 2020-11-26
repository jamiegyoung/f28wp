import React, { useEffect } from "react";
import { useState } from "react";

const NoMatch = () => {
  // current animation frame
  const [currentFrame, setCurrentFrame] = useState(0);
  // animation frames
  const frames = [
    `
 \\_O_/  
   | 
   ^
  | |
  `,
    `
 _O_  
/ | \\
  ^
 | |
  `,
  ];

  // change the frame ever 500ms
  useEffect(() => {
    setTimeout(() => {
      if (currentFrame >= frames.length - 1) {
        return setCurrentFrame(0);
      }
      setCurrentFrame(currentFrame + 1);
    }, 500);
  }, [currentFrame, frames.length]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1
        style={{
          color: "white",
          fontWeight: "normal",
        }}
      >
        404: Page Not Found?
      </h1>
      <pre
        className="noselect"
        style={{ fontSize: "24px", color: "white", fontFamily: "monospace" }}
      >
        {frames[currentFrame]}
      </pre>
    </div>
  );
};

export default NoMatch;
