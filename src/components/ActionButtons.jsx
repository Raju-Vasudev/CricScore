import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementRuns, addWicket, addBall, addExtra, decrementRuns, decrementBall, decrementExtra, decrementWickets, reset } from '../reducers/features/ScoreCardSlice';

const ActionButtons = () => {
  const [actionHistory, setActionHistory ] = useState([]);
  const [canUndo, setCanUndo] = useState(false); 
  const dispatch = useDispatch();

  const updateActionHistory = (action) => {
    setActionHistory([...actionHistory, action]);
    setCanUndo(true);
  };
  React.useEffect(() => {
    console.log(actionHistory);
  }, [actionHistory]);

  const handleRun = (runs) => {
    dispatch(incrementRuns(runs));
    dispatch(addBall());
    updateActionHistory({action: 'run', runs});
  };

  const handleExtra = (type) => {
    dispatch(addExtra({ type, runs: 1 }));
    if (type !== 'noBall' && type !== 'wide') {
      dispatch(addBall());
    }
    updateActionHistory({action: 'extra', type});
  };
  const handleWicket = () => {
    dispatch(addWicket());
    dispatch(addBall());
    updateActionHistory({action: 'wicket'});
  };
  const handleUndo = () => {
    if(canUndo && actionHistory.length)
    {
      if (!actionHistory.length) return;
      const newActionHistory = actionHistory.slice(0, -1);
      const lastAction = actionHistory.pop();
      setActionHistory(newActionHistory);
      switch (lastAction.action) {
        case 'run':
          dispatch(decrementRuns(lastAction.runs));
          dispatch(decrementBall());
          break;
        case 'extra':
          console.log(lastAction.type);
          dispatch(decrementExtra({ type: lastAction.type, runs: 1 }));
          dispatch(decrementRuns(1));
          if (lastAction.type !== 'noBall' && lastAction.type !== 'wide') {
            dispatch(decrementBall());
          }
          break;
        case 'wicket':
          dispatch(decrementWickets());
          dispatch(decrementBall());
          break;
        default:
          console.log('Unknown action: ', lastAction.action);
          break;
      };
      setCanUndo(false);
    }
  }

  return (
    <div>
      <button onClick={() => handleRun(0)}>Dot Ball</button>
      <button onClick={() => handleWicket()}>Wicket</button>
      <button onClick={() => handleExtra('noBall')}>No Ball</button>
      <button onClick={() => handleExtra('wide')}>Wide</button>
      {[1, 2, 3, 4, 5, 6].map(run => (
        <button key={run} onClick={() => handleRun(run)}>{run} Run{run > 1 ? 's' : ''}</button>
      ))}
      <button onClick={() => handleUndo()}>Undo</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default ActionButtons;
