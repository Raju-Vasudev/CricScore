import React from 'react';
import { useSelector } from 'react-redux';

const ScoreScreen = () => {
  const { innings, currentInning } = useSelector(state => state.scoreCard);
  const currentInnings = innings[currentInning];
  const currentOvers = Math.floor(currentInnings.currentOvers / 6);
  const currentBalls = currentInnings.currentOvers % 6;

  return (
    <div>
      <h2>Score: {currentInnings.runs}/{currentInnings.wickets}</h2>
      <h3>Overs: {currentOvers}.{currentBalls}</h3>
    </div>
  );
};

export default ScoreScreen;
