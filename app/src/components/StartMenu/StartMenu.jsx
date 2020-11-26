import React, { useRef, useState, useEffect } from 'react';

import './StartMenu.css'
import StartButton from './StartButton/StartButton'
import InstructionsButton from './InstructionsButton/InstructionsButton'

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
    <h1>Welcome to Type Titans</h1>
    <p>Rules of the game: You are given a sentence every 20 seconds, type these sentences as fast as possible to deal damage to the boss. Good luck and may the titans be in your favour.</p>
    <StartButton></StartButton>
    <p>We have a handy tutorial too!</p>
    <InstructionsButton></InstructionsButton>
  </div>
}

export default StartMenu;