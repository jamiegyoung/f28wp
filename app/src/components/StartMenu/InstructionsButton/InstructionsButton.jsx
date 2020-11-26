import React, { useState, useEffect } from 'react';
import './InstructionsButton.css'
import { useHistory } from 'react-router-dom';

const InstructionsButton = () => {
  const history = useHistory();
  const [hasStarted, setHasStarted] = useState(false);
  const [pseudoHidden, setPseudoHidden] = useState(false);
  
  useEffect(() => {
    if (hasStarted) {
      setTimeout(() => {
        history.push('/help');
      }, 200);
      return setPseudoHidden(true);
    }
    setPseudoHidden(false)
  }, [hasStarted, history])

  return <div
    className={`instructions-button ${pseudoHidden ? 'hidden' : ''}`}
    onClick={() => setHasStarted(true)}
  >
    <p className="noselect">Help!</p>
  </div>
}

export default InstructionsButton;