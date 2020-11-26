import React, { useState, useEffect } from 'react';
import './GoBackButton.css'
import { useHistory } from 'react-router-dom';

const GoBackButton = () => {
  const history = useHistory();
  const [hasStarted, setHasStarted] = useState(false);
  const [pseudoHidden, setPseudoHidden] = useState(false);
  
  useEffect(() => {
    if (hasStarted) {
      setTimeout(() => {
        history.push('/');
      }, 200);
      return setPseudoHidden(true);
    }
    setPseudoHidden(false)
  }, [hasStarted, history])

  return <div
    className={`goback-button ${pseudoHidden ? 'hidden' : ''}`}
    onClick={() => setHasStarted(true)}
  >
    <p className="noselect">Go Back</p>
  </div>
}

export default GoBackButton;