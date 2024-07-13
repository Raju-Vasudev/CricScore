import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementRuns, addWicket, addBall, addExtra } from '../reducers/features/scoreCardSlice';

const ActionButtons = () => {
  const dispatch = useDispatch();

  const handleRun = (runs) => {
    dispatch(incrementRuns(runs));
    dispatch(addBall());
  };

  const handleExtra = (type) => {
    dispatch(addExtra({ type, runs: 1 }));
    dispatch(addBall());
  };

  return (
    <div>
      <button onClick={() => handleRun(0)}>Dot Ball</button>
      <button onClick={() => dispatch(addWicket())}>Wicket</button>
      <button onClick={() => handleExtra('noBall')}>No Ball</button>
      <button onClick={() => handleExtra('wide')}>Wide</button>
      {[1, 2, 3, 4, 5, 6].map(run => (
        <button key={run} onClick={() => handleRun(run)}>{run} Run{run > 1 ? 's' : ''}</button>
      ))}
    </div>
  );
};

export default ActionButtons;
