import React, { useEffect } from "react";
import { useState } from "react";
import gameMusic from "./Media/Kevin_MacLeod_-_8bit_Dungeon_Boss.mp3";
import Cookies from "js-cookie";

const SoundButton = () => {
  const [muted, setMuted] = useState(false);
  const [music] = useState(new Audio(gameMusic));
  const cookieOp = Cookies; // Instantiate Cookies.

  useEffect(() => {
    // Function that checks for musicmuted cookie to leave music muted when a user leaves and rejoins the game (without logging out since it is session-bound)
    const checkForCookies = () => {
      if (cookieOp.get() === "musicmuted" ? true : false);
    };

    // If a cookie does not exist the music is not currently muted, play music.
    if (!muted && !checkForCookies()) {
      music.loop = true;
      music.volume = ".25";
      music.play().catch(() => setMuted(!muted));
      return;
    }

    music.pause();
    // eslint-disable-next-line
  }, [muted, music]);

  useEffect(() => {
    return () => {
      music.pause();
    };
  });

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        right: "50px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        color: "#cccc",
      }}
      className="noselect"
    >
      <p
        style={{
          margin: "12px 20px 0px 0px",
        }}
      >
        Music by{" "}
        <span
          onClick={() => window.open("https://www.youtube.com/user/kmmusic")}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Kevin MacLeod
        </span>
      </p>
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          cookieOp.set("musicmuted");
          setMuted(!muted);
        }}
      >
        {/* SVGs from material.io https://material.io/resources/icons/ */}
        {muted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="1 1 22 22"
            stroke="white"
            width="48px"
            height="48px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="1 1 22 22"
            stroke="white"
            width="48px"
            height="48px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SoundButton;
