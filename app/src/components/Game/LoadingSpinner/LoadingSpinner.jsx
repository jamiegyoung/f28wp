import React, { useState, useEffect, useRef } from 'react';
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  const [dots, setDots] = useState('.')
  const [pseudoHidden, setPseudoHidden] = useState(true)

  // useRef is used here due to it persisting whilst the component exists meaning it can catch a timeout
  // after the component is no longer mounted
  const componentIsMounted = useRef(true)
  
  useEffect(() => {
    setTimeout(() => {
      if (!componentIsMounted.current) return;
      setPseudoHidden(false)
    }, 200);
    // Returned function will be called when the component is unmounted
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (!componentIsMounted.current) return;

      if (dots.length < 3) {
        return setDots(`${dots}.`)
      }
      setDots('.')
    }, 600);
  }, [dots])
  return <div className={`loading-spinner-container ${(pseudoHidden) ? 'hidden' : ''}`}>
    <div className="loading-spinner"></div>
    <p>Loading{dots}</p>
  </div>
}

export default LoadingSpinner;