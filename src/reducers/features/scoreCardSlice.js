
import { createSlice } from '@reduxjs/toolkit';

const initialInningState = {
  runs: 0,
  wickets: 0,
  totalBallsBowled: 0,
  completedOvers: 0,
  extras: {
    byes: 0,
    legByes: 0,
    noBalls: 0,
    wides: 0,
    penalties: 0
  },
  totalOvers: 0,
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
        name: '',
        players: [],
        totalPlayers: 11
      },
      {
        name: '',
        players: [],
        totalPlayers: 11
      }
     ],
  matchStarted: false,
  totalOvers: 0,
  inningsCompleted: false,
  matchCompleted: false,
  target: 0,
  showSimpleScoreCard: false,
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
      state.innings[state.currentInning].totalBallsBowled += 1;      
      const overs = Math.floor(state.innings[state.currentInning].totalBallsBowled / 6);
      const balls = state.innings[state.currentInning].totalBallsBowled % 6;
      const oc = overs + balls / 10;
      state.innings[state.currentInning].completedOvers = oc;
      if(state.totalOvers > 0 && (state.innings[state.currentInning].completedOvers >= state.totalOvers)){
        if(state.currentInning === 0){
          state.inningsCompleted = true;
          state.target = state.innings[0].runs + 1;
          state.currentInning = 1;
        }
        else{
          state.matchCompleted = true;
        }
      }
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
    startMatch: (state, action) => {
      state.matchStarted = action.payload.newMatch;
      state.teamDetails = action.payload.teamDetails;
      state.totalOvers = action.payload.totalOvers;
      state.currentInning = action.payload.currentInning;
      state.innings[0].totalOvers = action.payload.totalOvers;
    },
    startSimpleScoreCard: (state) => {
      state.showSimpleScoreCard = true;
    }
  },
});

export const { startSimpleScoreCard, startMatch, reset, incrementRuns, addWicket, addBall, addExtra, switchInnings, setTarget, decrementBall, decrementExtra, decrementWickets, decrementRuns } = scoreCardSlice.actions;

export default scoreCardSlice.reducer;