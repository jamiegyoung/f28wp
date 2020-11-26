import React, { useState, useEffect } from 'react';
import './GoBackButton.css'
import { useHistory } from 'react-router-dom';

const GoBackButton = () => {
  const history = useHistory();

  // psuedohidden for hiding the button on click
  const [hasStarted, setHasStarted] = useState(false);
  const [pseudoHidden, setPseudoHidden] = useState(false);
  // Use states and pseudohidden to make the button pop up and transition.
  useEffect(() => {
    if (hasStarted) {
      setTimeout(() => {
        history.push('/'); // Take the user to the StartMenu
      }, 200);
      return setPseudoHidden(true);
    }
    setPseudoHidden(false)
  }, [hasStarted, history])

  return <div
    className={`goback-button ${pseudoHidden ? 'hidden' : ''}`} // Hide when clicked, smooth transition on click
    onClick={() => setHasStarted(true)}
  >
    <p className="noselect">Go Back</p>
  </div>
}

export default GoBackButton;