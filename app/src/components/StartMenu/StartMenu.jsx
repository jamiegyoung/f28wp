import React, { useRef, useState, useEffect } from 'react';

import './StartMenu.css'
import StartButton from './StartButton/StartButton'
import InstructionsButton from './InstructionsButton/InstructionsButton'

const StartMenu = () => {
  // pseduo hidden used for animation on click
  const [pseudoHidden, setPseudoHidden] = useState(true);

  // ic component loaded prevents state maniupulation when the component is not loaded 
  const isComponentLoaded = useRef(true)

  // After 200ms on load, set the menu as visible if it is still mounted
  useEffect(() => {
    setTimeout(() => {
      if (!isComponentLoaded) return;
      setPseudoHidden(false);
    }, 200);

    // When the components becomes un-mounted it won't manipulate the state
    return () => {
      isComponentLoaded.current = false;
    }
  }, [])

  // Dynamic classes allow hidden to be conditionally hidden
  return <div className={`start-container ${pseudoHidden ? 'hidden' : ''}`}>
    <h1>Welcome to Type Titans</h1>
    <p>Rules of the game: You are given a sentence every 20 seconds, type these sentences as fast as possible to deal damage to the boss. Good luck and may the titans be in your favour.</p>
    <StartButton></StartButton>
    <p>We have a handy tutorial too!</p>
    <InstructionsButton></InstructionsButton>
  </div>
}

export default StartMenu;