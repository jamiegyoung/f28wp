import React, { useState, useEffect } from 'react';
import './InstructionsButton.css'
import { useHistory } from 'react-router-dom';

const InstructionsButton = () => {
  const history = useHistory();

  // pseudo hidden for hiding button on click
  const [hasStarted, setHasStarted] = useState(false);
  const [pseudoHidden, setPseudoHidden] = useState(false);

  useEffect(() => {
    // if the button has been clicked, hie it and then after 200ms when the animation
    // has finished, redirect the user
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
    {/* No select so the user cannot select the text of the button */}
    <p className="noselect">Help!</p>
  </div>
}

export default InstructionsButton;