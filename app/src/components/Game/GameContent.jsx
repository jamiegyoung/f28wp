import React from 'react';
import io from "socket.io-client";

const GameContent = () => {
  useEffect(() => {
    const socket = socketIOClient("http://localhost:30284");
    socket.on('connect', () => console.log('connected'));
    socket.emit('test');
  }, []);

  return <div id="game-content"></div>
}

export default GameContent