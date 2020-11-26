import React, { useState, useEffect } from 'react';
import './StartButton.css'
import { useHistory } from 'react-router-dom';

const StartButton = () => {
  // pseudo hidden for hiding button on click
  const history = useHistory();
  const [hasStarted, setHasStarted] = useState(false);
  const [pseudoHidden, setPseudoHidden] = useState(false);
  
  useEffect(() => {
    // if the button has been clicked, has started is true
    if (hasStarted) {
      setTimeout(() => {
        // push the history /login, redirecting the user
        history.push('/login');
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