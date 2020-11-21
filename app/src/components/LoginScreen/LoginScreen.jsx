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

  // username and password text and input field
  return (
    <div className={`login-container ${pseudoHidden ? 'hidden' : ''}`}>
      <form className="login-form" action="api/authenticate-user" method="POST">
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
