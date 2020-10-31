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
    <h1>Welcome to Type Titans</h1>
    <p>Rules of the game: You are given a sentence every 5 seconds, type these sentences as fast as possible to deal damage to the boss, if every word in the sentence is typed out correctly you hit the opposing enemy with a critical strike! Good luck and may the titans be in your favour.</p>
    <StartButton></StartButton>
  </div>
}

export default StartMenu;