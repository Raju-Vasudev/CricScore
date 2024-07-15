import React from 'react'
import ActionButtons from '../components/ActionButtons';
import ScoreScreen from '../components/ScoreScreen';
import MatchDetails from '../components/MatchDetails';

function HomeScorePage() {
  return (
    <>
    <MatchDetails />
    <ScoreScreen />
    <ActionButtons />
    </>
  )
}

export default HomeScorePage
