import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import "./App.css";
import Game from "./components/Game/Game";
import StartMenu from "./components/StartMenu/StartMenu";
import LoginScreen from "./components/LoginScreen/LoginScreen";

import socketIOClient from "socket.io-client";

const App = () => {
  const history = useHistory();
  // useEffect(() => {
  //   const socket = socketIOClient("http://localhost:4516/");
  //   console.log(socket);
  //   socket.on("test", (data) => {
  //     console.log(data);
  //   });
  // }, []);
  // This allows for routing the jsx based off the url
  return (
    <Router history={history}>
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
};

export default App;
