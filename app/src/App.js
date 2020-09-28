import React, { useState } from 'react';
import './App.css';
import Game from "./components/Game"
import StartButton from "./components/StartButton/StartButton"

function App() {
  const [paused, setPaused] = useState(false)
  return (
    <div id="App">
      <StartButton updateState={setPaused}></StartButton>
      <Game paused={paused}></Game>
    </div>
  );
}

export default App;
