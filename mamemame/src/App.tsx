import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';

function App() {
  return (
    <GameBoard
        rows={10}
        cols={10}
    />
  );
}

export default App;
