
import { createSlice } from '@reduxjs/toolkit';

const initialInningState = {
  runs: 0,
  wickets: 0,
  overs: [],
  extras: {
    byes: 0,
    legByes: 0,
    noBalls: 0,
    wides: 0,
    penalties: 0
  },
  totalOvers: 0,
  currentOvers: 0,
  target: 0
};

const initialState = {
  innings: [initialInningState, { ...initialInningState }],
  currentInning: 0,
  teams: {
    batting: '',
    bowling: ''
  },
  teamDetails: [
      {
        name: 'Team 1',
        players: [],
        totalPlayers: 11
      },
      {
        name: 'Team 2',
        players: [],
        totalPlayers: 11
      }
     ],
};

export const scoreCardSlice = createSlice({
  name: 'scoreCard',
  initialState,
  reducers: {
    incrementRuns: (state, action) => {
      state.innings[state.currentInning].runs += action.payload;
    },
    addWicket: (state) => {
      state.innings[state.currentInning].wickets += 1
    },
    addBall: (state) => {
      state.innings[state.currentInning].currentOvers += 1;
    },
    addExtra: (state, action) => {
      const { type, runs } = action.payload;
      state.innings[state.currentInning].extras[type] += 1;
      state.innings[state.currentInning].runs += runs;
      if (type === 'byes' || type === 'legByes') {
        state.innings[state.currentInning].currentOvers -= 1;
      }
    },
    switchInnings: (state) => {
      state.currentInning = 1;
    },
    setTarget: (state, action) => {
      state.innings[1].target = action.payload;
    },
    decrementRuns: (state, action) => {
      state.innings[state.currentInning].runs -= action.payload;
    },
    decrementWickets: (state) => {
      state.innings[state.currentInning].wickets -= 1;
    },
    decrementBall: (state) => {
      if (state.innings[state.currentInning].currentOvers > 0) {
        state.innings[state.currentInning].currentOvers -= 1;

        // const balls = state.innings[state.currentInning].currentOvers % 6;
        // const overs = Math.floor(state.innings[state.currentInning].currentOvers / 6);
        // if (balls === 5) {
        //   state.innings[state.currentInning].totalOvers = overs;
        //   state.innings[state.currentInning].overs.pop();
        // }
      }
    },
    decrementExtra: (state, action) => {
      const { type, runs } = action.payload;
      if (state.innings[state.currentInning].extras[type] > 0) {
        state.innings[state.currentInning].extras[type] -= 1;
        state.innings[state.currentInning].runs -= runs;
        if (type === 'byes' || type === 'legByes') {
          state.innings[state.currentInning].currentOvers += 1;
        }
      }
    },
    reset: () => initialState,
  },
});

export const {  reset, incrementRuns, addWicket, addBall, addExtra, switchInnings, setTarget, decrementBall, decrementExtra, decrementWickets, decrementRuns } = scoreCardSlice.actions;

export default scoreCardSlice.reducer;
