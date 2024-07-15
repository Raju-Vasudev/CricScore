import React from 'react';
import { useSelector } from 'react-redux';

const ScoreScreen = () => {
  // const { innings, currentInning, matchStarted, showSimpleScoreCard } = useSelector(state => state.scoreCard);
  const matchStarted = useSelector(state => state.scoreCard.matchStarted);
  const showSimpleScoreCard = useSelector(state => state.scoreCard.showSimpleScoreCard);
  const currentInning = useSelector(state => state.scoreCard.currentInning);
  const innings = useSelector(state => state.scoreCard.innings);
  const completedOvers = useSelector(state => state.scoreCard.innings[state.scoreCard.currentInning].completedOvers);
  const currentInnings = innings[currentInning];
  return (
    <>{ (matchStarted || showSimpleScoreCard ) &&
    <div>
    <h2>Score: {currentInnings.runs}/{currentInnings.wickets}</h2>
    <h3>Overs: {completedOvers}</h3>
  </div>
    }
    </>
  );
};

export default ScoreScreen;
