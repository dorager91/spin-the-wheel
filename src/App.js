import React from 'react';
import Wheel from './components/Wheel';
import ChipControls from './components/ChipControls';
import Result from './components/Result';

function App() {
  return (
      <div className="App">
        <h1>Spin-the-Wheel Scheduler 🎡</h1>
        <Wheel />
        <ChipControls />
        <Result />
      </div>
  );
}

export default App;


