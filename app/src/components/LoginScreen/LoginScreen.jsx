import React, { useRef, useState, useEffect, setState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [pseudoHidden, setPseudoHidden] = useState(true);
  const isComponentLoaded = useRef(true)

  useEffect(() => {
    setTimeout(() => {
      if (!isComponentLoaded) return;
      setPseudoHidden(false);
    }, 200);

    return () => {
      isComponentLoaded.current = false;
    }
  }, [])

  const history = useHistory();

  const submitEntry = (click) => {
    // ** TODO **: ADD SQL integration here.
    click.preventDefault();
    // IF PASSWORD AND USER MATCH DB, GO TO /GAME ELSE LOG AND ALERT.

    history.push("/game");
  };

  return (
    // username and password text and input field
    <div className={`login-container ${pseudoHidden ? 'hidden' : ''}`}>
      <form className="login-form" action="api/authenticate" method="POST">
        <label>Username:</label>
        <input type="text" name="username" placeholder="Username" required />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginScreen;
