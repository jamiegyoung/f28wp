import React, { useRef, useState, useEffect } from 'react';

import './StartMenu.css'
import StartButton from './StartButton/StartButton'

const StartMenu = () => {
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

  return <div className={`start-container ${pseudoHidden ? 'hidden' : ''}`}>
    {/* temporary game description */}
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum purus eu urna dapibus, vel scelerisque enim lacinia. Nulla facilisi. Phasellus vitae sollicitudin orci, eu molestie ante. Praesent ultrices egestas suscipit. Quisque lacinia at quam vel egestas. Sed sed fringilla orci, eget ullamcorper quam. Fusce ac urna et magna porttitor scelerisque. Nam at placerat diam. Nam non ligula quis quam mollis placerat a vel felis. Vestibulum in sem in nibh consectetur venenatis id quis dui.</p>
    <h1>Have fun!</h1>
    <StartButton></StartButton>
  </div>
}

export default StartMenu;