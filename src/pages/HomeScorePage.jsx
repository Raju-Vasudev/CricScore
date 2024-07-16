import React from 'react';
import Actions from '../components/Actions';
import ScoreScreen from '../components/ScoreScreen';
import MatchDetails from '../components/MatchDetails';

function HomeScorePage() {
  return (
    <>
      <MatchDetails />
      <ScoreScreen />
      <Actions />
    </>
  );
}

export default HomeScorePage;
