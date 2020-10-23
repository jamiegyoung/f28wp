import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Game from "./components/Game/Game";
import StartMenu from "./components/StartMenu/StartMenu";

import socketIOClient from "socket.io-client";


function App() {
  useEffect(() => {
    const socket = socketIOClient('http://localhost:4516/');
    console.log(socket);
    // socket.on("")
  }, [])
  return (
    // This allows for routing the jsx based off the url
    <Router>
      <div id="App">
        {/* Only allow a single route to load */}
        <Switch>
          <Route path="/" exact>
            <StartMenu></StartMenu>
          </Route>
          <Route path="/game">
            <Game></Game>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
