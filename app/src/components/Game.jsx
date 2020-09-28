import React from "react";

const Game = (props) => {
  return <div style={{color: 'white'}}>{(props.paused === true) ? "started" : "paused"}</div>
}

export default Game