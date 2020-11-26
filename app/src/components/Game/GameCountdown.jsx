import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const GameCountdown = ({ reset }) => {
  // set the time as 20 seconds, could be received from the api in the futures
  const [time, _setTime] = useState(20);

  const timeRef = useRef(time);

  const setTime = (newTime) => {
    timeRef.current = newTime;
    _setTime(newTime);
  };

  const setTimeDecrement = (newTime) => {
    setTime(newTime);
    decrementTimer();
  };

  const decrementTimer = () => {
    setTimeout(() => {
      const newTimeRef = timeRef.current - 1;
      const newTime = newTimeRef < 0 ? 0 : newTimeRef;
      setTimeDecrement(newTime);
    }, 1000);
  };

  // if reset is changed, reset the time
  useEffect(() => {
    setTime(20);
  }, [reset]);

  useEffect(() => {
    // start decrementing the timer
    decrementTimer();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <p
        style={{
          color: "#eeee",
          fontSize: "48px",
          margin: "0px 0px 5px 0px",
        }}
      >{reset.length > 0 ? `[${time}]` : "[PREPARE YOURSELF]"}
      </p>
    </div>
  );
};

export default GameCountdown;
