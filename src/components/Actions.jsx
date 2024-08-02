import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {
  incrementRuns,
  addWicket,
  addBall,
  addExtra,
  reset,
  setDeliveryMapInEachOver,
  toggleScoreCard,
} from '../reducers/features/ScoreCardSlice';
import './Actions.css';
import DeliveryMap from './DeliveryMap';

const ActionButtons = () => {
  const dispatch = useDispatch();
  const {
    inningsCompleted,
    matchStarted,
    showSimpleScoreCard,
    isOverCompleted,
    toggleScoreCardFlag,
  } = useSelector((state) => state.scoreCard);
  const completedOvers = useSelector(
    (state) => state.scoreCard.innings[state.scoreCard.currentInning].completedOvers,
  );
  const dmineo = useSelector(
    (state) => state.scoreCard.innings[state.scoreCard.currentInning].deliveryMapInEachOver,
  );
  const [actionHistory, setActionHistory] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const updateActionHistory = (action) => {
    setActionHistory([...actionHistory, action]);
  };
  const handleRun = (runs) => {
    dispatch(incrementRuns(runs));
    handleValidBall();
    handleDelivery(runs);
    updateActionHistory({ action: 'run', runs });
  };
  const handleExtra = (type) => {
    dispatch(addExtra({ type, runs: 1 }));
    const oc = type === 'noBall' ? 'NB' : type === 'wide' ? 'WD' : type;
    handleDelivery(oc);
    if (type !== 'noBall' && type !== 'wide') {
      handleValidBall();
    }
    updateActionHistory({ action: 'extra', type });
  };
  const handleWicket = () => {
    dispatch(addWicket());
    handleValidBall();
    handleDelivery('W');
    updateActionHistory({ action: 'wicket' });
  };
  // const handleUndo = () => {
  //   if (canUndo && actionHistory.length) {
  //     if (!actionHistory.length) return;
  //     const newActionHistory = actionHistory.slice(0, -1);
  //     const lastAction = actionHistory.pop();
  //     setActionHistory(newActionHistory);
  //     switch (lastAction.action) {
  //       case 'run':
  //         dispatch(decrementRuns(lastAction.runs));
  //         dispatch(decrementBall());
  //         break;
  //       case 'extra':
  //         dispatch(decrementExtra({ type: lastAction.type, runs: 1 }));
  //         dispatch(decrementRuns(1));
  //         if (lastAction.type !== 'noBall' && lastAction.type !== 'wide') {
  //           dispatch(decrementBall());
  //         }
  //         break;
  //       case 'wicket':
  //         dispatch(decrementWickets());
  //         dispatch(decrementBall());
  //         break;
  //       default:
  //         break;
  //     }
  //     setCanUndo(false);
  //   }
  // };
  const handleReset = () => {
    dispatch(reset());
    setActionHistory([]);
    setDeliveries([]);
  };
  const handleValidBall = () => {
    dispatch(addBall());
  };
  const handleViewScorecard = () => {
    dispatch(toggleScoreCard());
  };
  const handleDelivery = (outcome) => {
    setDeliveries((deliveries) => [...deliveries, outcome]);
  };
  const updateDeliveries = (selectedIndex) => {
    const uDeliveries = deliveries.filter((_, index) => index !== selectedIndex);
    setDeliveries(uDeliveries);
  };
  React.useEffect(() => {
    if (isOverCompleted) {
      dispatch(setDeliveryMapInEachOver(deliveries));
      setDeliveries([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveries, isOverCompleted]);
  return (
    ((matchStarted && !inningsCompleted) || showSimpleScoreCard) && (
      <>
        {deliveries.length >= 0 && (
          <DeliveryMap deliveries={deliveries} updateDeliveries={updateDeliveries} />
        )}
        <div className="ActionsContainer">
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => handleRun(0)}
          >
            Dot Ball
          </Button>
          {[1, 2, 3, 4, 6].map((run) => (
            <Button
              variant="contained"
              color="primary"
              className="button"
              key={run}
              onClick={() => handleRun(run)}
            >
              {run} Run{run > 1 ? 's' : ''}
            </Button>
          ))}
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => handleWicket()}
          >
            Wicket
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => handleExtra('noBall')}
          >
            No Ball
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => handleExtra('wide')}
          >
            Wide
          </Button>
          </div>
          <div className="ActionsContainer-2">
          <Button
            variant="contained"
            color="secondary"
            className="button2"
            onClick={() => handleReset()}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="button2"
            onClick={() => handleViewScorecard()}
          >
            {toggleScoreCardFlag ? 'Hide Scorecard' : 'View Scorecard '}
          </Button>
          </div>
      </>
    )
  );
};

export default ActionButtons;

