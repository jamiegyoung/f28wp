import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Game from "./components/Game/Game";
import StartMenu from "./components/StartMenu/StartMenu";
import LoginScreen from "./components/LoginScreen/LoginScreen";

import socketIOClient from "socket.io-client";

function App() {
  // useEffect(() => {
  //   const socket = socketIOClient("http://localhost:4516/");
  //   console.log(socket);
  //   socket.on("test", (data) => {
  //     console.log(data);
  //   });
  // }, []);
  return (
    // This allows for routing the jsx based off the url
    <Router>
      <div id="App">
        {/* Only allow a single route to load */}
        <Switch>
          <Route path="/" exact>
            <StartMenu></StartMenu>
          </Route>
          <Route path="/login">
            <LoginScreen></LoginScreen>
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
