import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'

const CookieConsent = () => {
  const [pseudoHidden, setPseudoHidden] = useState(true);
  const isComponentLoaded = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      if (!isComponentLoaded) return;
      Cookies.get();
      setPseudoHidden(false);
    }, 200);

    return () => {
      isComponentLoaded.current = false;
    };
  }, []);

  const closeBanner = () => {
    if (Cookies.get() != "banner") Cookies.set("banner");
    setPseudoHidden(true); //TODO fix this
  }

  return (
    <center><div
      style={{
        display: "flex",
        position: "fixed",
        bottom: "0px",
        alignItems: "center",
        
      }}
    >
      <div style={{
        position: "center",

        width: "100%",
        height: "100px",
        backgroundColor: '#212121',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      }}>
        <h3
        className="noselect"
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          By playing this game, you agree to let us use of cookies. This is only to better your experience.
        </h3>
        <button
            onClick = {closeBanner}
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
    </div></center>
    // TODO: Fix pseudoHidden // TODO: add cookie to remember that banner has been closed. // TODO: Move to center of screen.
  );
};

export default CookieConsent;
