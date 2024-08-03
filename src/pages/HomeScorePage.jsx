import React from 'react';
import Actions from '../components/Actions';
import ScoreScreen from '../components/MainScoreDisplay';
import StartMatchConfigurationDialog from '../components/StartMatchConfigurationDialog';
import MatchDetails from '../components/MatchDetails';
import ScoreBoard from '../components/ScoreBoardDialog';

function HomeScorePage() {
  return (
    <>
      <StartMatchConfigurationDialog />
      <MatchDetails />
      <ScoreScreen />
      <Actions />
      <ScoreBoard />
    </>
  );
}

export default HomeScorePage;
