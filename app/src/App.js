import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import "./App.css";
import Game from "./components/Game/Game";
import StartMenu from "./components/StartMenu/StartMenu";
import NoMatch from './components/NoMatch'
import AccountScreen from './components/AccountScreen/AccountScreen';

// import socketIOClient from "socket.io-client";

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
            <AccountScreen></AccountScreen>
          </Route>
          <Route path="/register">
            <AccountScreen registration></AccountScreen>
          </Route>
          <Route path="/game">
            <Game></Game>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
