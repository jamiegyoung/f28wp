import React, { useState, useEffect } from 'react';
import './StartButton.css'
import { Route, Link, useHistory } from 'react-router-dom';

const StartButton = () => {
  const history = useHistory();
  const [hasStarted, setHasStarted] = useState(false);
  const [pseudoHidden, setPseudoHidden] = useState(false);
  
  useEffect(() => {
    if (hasStarted) {
      setTimeout(() => {
        history.push('/game');
      }, 200);
      return setPseudoHidden(true);
    }
    setPseudoHidden(false)
  }, [hasStarted, history])

  return <div
    className={`start-button ${pseudoHidden ? 'hidden' : ''}`}
    onClick={() => setHasStarted(true)}
  >
    <p className="noselect">Start!</p>
  </div>
}

export default StartButton;