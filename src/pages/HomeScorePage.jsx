import React from 'react';
import Actions from '../components/Actions';
import ScoreScreen from '../components/ScoreScreen';
import StartMatchScoreCard from '../components/StartMatchScoreCard';

function HomeScorePage() {
  return (
    <>
      <StartMatchScoreCard />
      <ScoreScreen />
      <Actions />
    </>
  );
}

export default HomeScorePage;
