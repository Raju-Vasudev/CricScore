import React from 'react'
import { useSelector } from 'react-redux'

function MatchModeScreen() {
  const { teamDetails, currentInning, matchStarted, totalOvers, target } =
  useSelector((state) => state.scoreCard);
  return (
    <div>
      {matchStarted && (
        <div>
          <h2>Match Details</h2>
          <h3>Team 1: {teamDetails[0].name}</h3>
          <h3>Team 2: {teamDetails[1].name}</h3>
          <h3>Total Overs: {totalOvers}</h3>
          {currentInning > 0 && <h3>Target: {target}</h3>}
        </div>
      )}
    </div>
  )
}

export default MatchModeScreen
