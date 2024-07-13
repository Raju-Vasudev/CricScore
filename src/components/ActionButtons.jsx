import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
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
  const handleReset = () => {
    dispatch(reset());
    setActionHistory([]);
    setCanUndo(false);
  }

  return (
    <div>
      <Button onClick={() => handleRun(0)}>Dot Ball</Button>
      <Button onClick={() => handleWicket()}>Wicket</Button>
      <Button onClick={() => handleExtra('noBall')}>No Ball</Button>
      <Button onClick={() => handleExtra('wide')}>Wide</Button>
      {[1, 2, 3, 4, 5, 6].map(run => (
        <Button key={run} onClick={() => handleRun(run)}>{run} Run{run > 1 ? 's' : ''}</Button>
      ))}
      <Button onClick={() => handleUndo()}>Undo</Button>
      <Button onClick={() => handleReset()}>Reset</Button>
    </div>
  );
};

export default ActionButtons;
