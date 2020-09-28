import React, { useState, useEffect } from 'react';
import './StartButton.css'

const StartButton = ({ updateState }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [pseudoHidden, setPseudoHidden] = useState(false);
  const [buttonIsHidden, setButtonIsHidden] = useState(false);
  
  useEffect(() => {
    updateState(hasStarted)
    if (hasStarted) {
      setTimeout(() => {
        setButtonIsHidden(true)
      }, 200);
      return setPseudoHidden(true);
    }
    setPseudoHidden(false)
  }, [hasStarted, updateState])

  return <div style={{
       display: (buttonIsHidden) ? 'none' : 'flex'
    }}
    className={`start-button ${pseudoHidden ? 'hidden' : ''}`}
    onClick={() => setHasStarted(true)}
  >
    <p className="noselect">Start!</p>
  </div>
}

export default StartButton;