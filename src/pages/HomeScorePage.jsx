import React from 'react';
import Actions from '../components/Actions';
import ScoreScreen from '../components/ScoreScreen';
import StartMatchScoreCard from '../components/StartMatchScoreCard';
import MatchModeScreen from '../components/MatchModeScreen';

function HomeScorePage() {
  return (
    <>
      <StartMatchScoreCard />
      <MatchModeScreen />
      <ScoreScreen />
      <Actions />
    </>
  );
}

export default HomeScorePage;
