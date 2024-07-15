import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { incrementRuns, addWicket, addBall, addExtra, decrementRuns, decrementBall, decrementExtra, decrementWickets, reset } from '../reducers/features/ScoreCardSlice';
import './ActionButtons.css';

const ActionButtons = () => {
  const dispatch = useDispatch();
  const { inningsCompleted, matchStarted, showSimpleScoreCard } = useSelector(state => state.scoreCard);
  const [actionHistory, setActionHistory ] = useState([]);
  const [canUndo, setCanUndo] = useState(false); 

  const updateActionHistory = (action) => {
    setActionHistory([...actionHistory, action]);
    setCanUndo(true);
  };

  const handleRun = (runs) => {
    dispatch(incrementRuns(runs));
    handleValidBall();
    updateActionHistory({action: 'run', runs});
  };
  const handleExtra = (type) => {
    dispatch(addExtra({ type, runs: 1 }));
    if (type !== 'noBall' && type !== 'wide') {
      handleValidBall();
    }
    updateActionHistory({action: 'extra', type});
  };
  const handleWicket = () => {
    dispatch(addWicket());
    handleValidBall();
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
  const handleValidBall = () => {
    dispatch(addBall());
  }
  return (
    ((matchStarted && !inningsCompleted) || showSimpleScoreCard )  &&
      <div className='ActionsContainer'>
            <Button variant='outlined' className='button' onClick={() => handleRun(0)}>Dot Ball</Button>
            <Button variant='outlined' className='button' onClick={() => handleWicket()}>Wicket</Button>
            <Button variant='outlined' className='button' onClick={() => handleExtra('noBall')}>No Ball</Button>
            <Button variant='outlined' className='button' onClick={() => handleExtra('wide')}>Wide</Button>
            {[1, 2, 3, 4, 5, 6].map(run => (
              <Button variant='outlined' className='button' key={run} onClick={() => handleRun(run)}>{run} Run{run > 1 ? 's' : ''}</Button>
            ))}
            <Button variant='outlined' className='button' onClick={() => handleUndo()}>Undo</Button>
            <Button variant='outlined' className='button' onClick={() => handleReset()}>Reset</Button>
      </div>
  );
};

export default ActionButtons;