import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [pseudoHidden, setPseudoHidden] = useState(true);
  const isComponentLoaded = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      if (!isComponentLoaded) return;
      setPseudoHidden(false);
    }, 200);

    return () => {
      isComponentLoaded.current = false;
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "bottom",
        alignItems: "center",
        height: "30vh",
      }}
    >
      <div style={{
        maxWidth: '500px',
        backgroundColor: '#212121',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      }}>
        <h1
        className="noselect"
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          By playing this game, you agree to let us use of cookies. This is only to better your experience.
        </h1>
        <button
            style = {{
                backgroundColor: "green",
                position: "center",
                border: "2px solid green",
                padding: "6px 32px",
                textAlign: "center",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: "pointer",
            }}>Okay!</button>
      </div>
    </div>
  );
};

export default CookieConsent;
