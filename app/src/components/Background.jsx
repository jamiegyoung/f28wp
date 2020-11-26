import React, { useState } from "react";
import { useEffect } from "react";

// The challenge of creating a responsive ascii ui
const Background = () => {
  const calcWidth = () => {
    const count = Math.floor(window.innerWidth / 11.2 - 4);
    return count ? count : 1;
  };

  const calcHeight = () => {
    const count = Math.floor(window.innerHeight / 11.2 - 5);
    return count ? count : 1;
  };

  const [characterWidthCount, setCharacterWidthCount] = useState(calcWidth);

  const [characterHeightCount, setCharacterHeightCount] = useState(calcHeight);

  useEffect(() => {
    const handleResize = () => {
      setCharacterWidthCount(calcWidth);
      setCharacterHeightCount(calcHeight);
    };

    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="noselect">
      {/* Top Border */}
      <div
        style={{
          position: "fixed",
          top: "0px",
          fontSize: "28px",
          color: "#cccc",
          marginLeft: "20px",
        }}
      >
        {` /${Array(characterWidthCount).join("-")}\\`}
      </div>

      {/* Bottom border */}
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          fontSize: "28px",
          color: "#cccc",
          marginLeft: "20px",
        }}
      >
        {` \\${Array(characterWidthCount).join("-")}/`}
      </div>
      <div
        style={{
          position: "fixed",
          top: "40px",
          fontSize: "28px",
          color: "#cccc",
          marginLeft: "5px",
          writingMode: "vertical-rl",
        }}
      >
        {`${Array(characterHeightCount).join("-")}`}
      </div>
      <div
        style={{
          position: "fixed",
          top: "40px",
          right: "0px",
          fontSize: "28px",
          color: "#cccc",
          marginLeft: "5px",
          writingMode: "vertical-rl",
        }}
      >
        {`${Array(characterHeightCount).join("-")}`}
      </div>
    </div>
  );
};

export default Background;